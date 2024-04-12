import userModel from "../../../../db/models/user.schema.js";
import generateOtp from "../../../utils/emailing/generateOtp.js";
import sendingMail from "../../../utils/emailing/send.email.js";
import appErr from "../../../utils/handler/appErr.js";
import errHandler from "../../../utils/handler/errHandlers.js";
import bcrypt from "bcrypt";

export const updateUser = errHandler(async (req, res, next) => {
  if (req.existUser && req.user.phone != req.body.phone) {
    return next(new appErr("this user already exist", 409));
  } else {
    let updatedUser = await userModel
      .findByIdAndUpdate(req.user._id, req.body, { new: true })
      .select("_id firstName lastName email age gender phone");
    updatedUser && res.json({ msg: "success", updatedUser });
    !updatedUser && next(new appErr("cant update", 409));
  }
});

export const deleteUser = errHandler(async (req, res, next) => {
  if (req.existUser) {
    return next(new appErr("this user already exist", 409));
  } else {
    let deletedUser = await userModel
      .findByIdAndDelete(req.user._id)
      .select("_id firstName lastName email age gender phone");
    deletedUser && res.json({ msg: "success", deletedUser });
    !deletedUser && next(new appErr("cant delete", 409));
  }
});

export const updatePassword = errHandler(async (req, res, next) => {
  if (req.existUser) {
    return next(new appErr("this user already exist", 409));
  } else {
    let isPasswordMatched = bcrypt.compareSync(
      req.body.oldPassword,
      req.user.password
    );
    if (!isPasswordMatched) {
      return next(new appErr("password is incorrect", 409));
    } else {
      if (req.body.password !== req.body.rePassword) {
        return next(new appErr("new password mismatch", 409));
      } else {
        let updatedUser = await userModel.findOneAndUpdate(
          { _id: req.user._id },
          { password: req.body.password },
          { new: true }
        );
        res.json({ msg: "success", updatedUser });
      }
    }
  }
});

export const forgetPassword = errHandler(async (req, res, next) => {
  if (!req.existUser) {
    return next(new appErr("this user is not exist", 409));
  } else {
    let otp = generateOtp();
    let user = await userModel.findByIdAndUpdate(req.existUser._id, { otp },{new:true});
    let url = process.env.RESTPASSWORD_URL;

    sendingMail(req.body.email, url, "otpEmailBody", req.existUser, user.otp);
    res.json({ msg: "success", user });
  }
});
export const restPassword = errHandler(async (req, res, next) => {
  if (!req.existUser) {
    return next(new appErr("this user is not exist", 409));
  } else {
    if (req.body.otp != req.existUser.otp) {
      return next(new appErr("this otp is invalid", 409));
    } else {
      if (!req.body.password == req.body.rePassword) {
        return next(new appErr("password is mismatch", 409));
      } else {
        let user = await userModel.findOneAndUpdate(
          { _id: req.existUser._id },
          { password: req.body.password },
          { new: true }
        );
        res.json({ msg: "success", user });
      }
    }
  }
});
