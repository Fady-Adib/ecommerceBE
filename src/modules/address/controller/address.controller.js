import slugify from "slugify";
import errHandler from "../../../utils/handler/errHandlers.js";


import appErr from "../../../utils/handler/appErr.js";
import ApiFeature from "../../../utils/api.feature.js";
import productModel from "../../../../db/models/product.schema.js";
import userModel from "../../../../db/models/user.schema.js";


export const addAddress= errHandler(async (req, res, next) => {
if (req.user.addresses.length >=5) return next(new appErr("max addresses to add is 5"));
 let updatedUser= await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{addresses:req.body}},{new:true}).select("addresses")
  res.json({
    msg: "success",
    addresses:updatedUser,
  });
});
export const removeAddress = errHandler(async (req, res, next) => {

  let updatedUser = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $pull: { addresses: { _id: req.params.id } } },
      { new: true }
    ).select("addresses");
  res.json({
    msg: "success",
    updatedUser,
  });
 
});
export const getAllAddresses = errHandler(async (req, res, next) => {

 let apiFeature = new ApiFeature(
   userModel.findById(req.user._id).select("addresses"),
   req.query
 );
 apiFeature.pagination().search().sort().fields();
 let user = await apiFeature.dbQuery;

 res.json({
   msg: "success",
   user,
 });

});


