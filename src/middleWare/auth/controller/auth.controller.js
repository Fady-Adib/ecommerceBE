import jwt from "jsonwebtoken";
import appErr from "../../../utils/handler/appErr.js";
import errHandler from "../../../utils/handler/errHandlers.js";
import userModel from "./../../../../db/models/user.schema.js";
import bcrypt from "bcrypt";
import sendingMail from "../../../utils/emailing/send.email.js";


export const auth = errHandler(async (req, res, next) => { 
let {token}=req.headers
jwt.verify(token,process.env.SECRET_KEY, async (err, decoded) => {
  
if (err) {
   return    next(new appErr("invalid token",401));
}
let foundedUser=await userModel.findById(decoded.id)


if (!foundedUser) {
   return next(new appErr("this user is not exist", 404));
}
if (!foundedUser.verified) {
     return next(new appErr("please verify your email first", 409));
}
if ("offline"==foundedUser.status) {
      return next(new appErr("please login first", 409));
}
if (!foundedUser.isActive) {
     return next(new appErr("this user is deleted", 409));
} 
if (foundedUser.passwordChangeTime) {
  let changePasswordTime = Number(foundedUser.passwordChangeTime) / 1000;

  if (decoded.iat < changePasswordTime) {return next(new appErr("expired Token", 409));}
  else{  req.user = foundedUser;
  next()}
}else {
  req.user = foundedUser;
  next();
}

})



});
export const allowTo =(...roles)=>{
return errHandler(async (req, res, next) => {
  if (!roles.includes(req.user.role)) {
   return next(new appErr("invalid role", 409));
  }
  next()
})
} 

export const signUp = errHandler(async (req, res, next) => {
    if (req.existUser) {
        if (req.existUser.isActive) {
             return next(new appErr("this user is already existing", 401));
        }
        else{
 return next(new appErr("this user is deleted", 404));
        }
    } else {
      let preAddedUser = userModel(req.body);
      let addedUser = await preAddedUser.save();
      let emailToken = jwt.sign({ id: addedUser._id }, process.env.SECRET_KEY);
      let verifyUrl = process.env.VERIFIED_URL + emailToken;
      sendingMail(addedUser.email, verifyUrl, "verification");
      res.json({ msg: "success", addedUser });
    }
});
export const signIn = errHandler(async (req, res, next) => {
    if (!req.existUser) {
        return next(new appErr("this user is not exist",404));
    } else {
        let passwordIsMatched = bcrypt.compareSync(
          req.body.password,
          req.existUser.password
        );
        if (passwordIsMatched) {
            if (!req.existUser.verified) {
                return next(new appErr("please verify your email first",409));
            }
            let token = jwt.sign(
                { id:req.existUser._id, role:req.existUser.role },
                process.env.SECRET_KEY,{expiresIn:"30d"}
            );
            let updatedUser = await userModel.findByIdAndUpdate(
               req.existUser._id,
                { status: "online" },
                { new: true }
            );
            res.json({ msg: "success", token, updatedUser });
        } else {
            return next(new appErr("password mismatch",401));
        }
    }
});
export const verify = errHandler(async (req, res, next) => {
   let{emailToken}=req.params
   jwt.verify(emailToken, process.env.SECRET_KEY, async (err, decoded) => {
     if (err) {
       return next(new appErr("invalid Url",401));
     } else {
       let { id } = decoded;
       let verifiedUser = await userModel.findByIdAndUpdate(
         id,
         { verified: true },
         { new: true }
       );
       res.json({ msg: "success", verifiedUser });
     }
   });
});