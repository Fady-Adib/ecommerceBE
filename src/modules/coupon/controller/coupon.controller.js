
import errHandler from "../../../utils/handler/errHandlers.js";


import appErr from "../../../utils/handler/appErr.js";
import ApiFeature from "../../../utils/api.feature.js";
import productModel from "../../../../db/models/product.schema.js";
import userModel from "../../../../db/models/user.schema.js";
import couponModel from "../../../../db/models/Coupon.schema.js";
import QRCode from "qrcode";


export const addCoupon= errHandler(async (req, res, next) => {

 if (req.coupon) return next(new appErr("this coupon is exists"));
 let preAddedCoupon= couponModel(req.body)
 
 let addedCoupon =await preAddedCoupon.save()
 QRCode.toDataURL(addedCoupon.code)
   .then((url) => {
     res.json({
       msg: "success",
       addedCoupon,
       url
     });
   })
   .catch((err) => {
     console.error(err);
   });
 
});
export const deleteCoupon = errHandler(async (req, res, next) => {
  let foundedCoupon = await couponModel.findById(req.params.id);
  if (!foundedCoupon) return next(new appErr("this coupon is not exists"));

  let deletedCoupon = await couponModel.findByIdAndDelete(req.params.id);
  res.json({
    msg: "success",
    deletedCoupon,
  });
 
});
export const getAllCoupon = errHandler(async (req, res, next) => {

 let apiFeature = new ApiFeature(
   couponModel.find(),
   req.query
 );
 apiFeature.pagination().search().sort().fields();
 let user = await apiFeature.dbQuery;

 res.json({
   msg: "success",
   user,
 });


 
});