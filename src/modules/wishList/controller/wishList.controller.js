import slugify from "slugify";
import errHandler from "../../../utils/handler/errHandlers.js";


import appErr from "../../../utils/handler/appErr.js";
import ApiFeature from "../../../utils/api.feature.js";
import productModel from "../../../../db/models/product.schema.js";
import reviewModel from "../../../../db/models/review.schema.js";
import userModel from "../../../../db/models/user.schema.js";


export const addToWishList= errHandler(async (req, res, next) => {
  let product=await productModel.findById(req.params.id);
 if (!product) return next(new appErr("this product is not exists"));
if (req.user.wishList.length >= 50)
  return next(new appErr("max wishList items to add is 50"));

 let updatedUser= await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishList:req.params.id}},{new:true})
  res.json({
    msg: "success",
    updatedUser,
  });
});
export const removeFromWishList = errHandler(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) return next(new appErr("this product is not exists"));

  let updatedUser = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishList: req.params.id } },
    { new: true }
  );
  res.json({
    msg: "success",
    updatedUser,
  });
 
});
export const getAllWishListForUser = errHandler(async (req, res, next) => {

 let apiFeature = new ApiFeature(
   userModel.findById(req.user._id).select("wishList"),
   req.query
 );
 apiFeature.pagination().search().sort().fields();
 let user = await apiFeature.dbQuery;

 res.json({
   msg: "success",
   user,
 });


 
});