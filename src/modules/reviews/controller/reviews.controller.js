import slugify from "slugify";
import errHandler from "../../../utils/handler/errHandlers.js";


import appErr from "../../../utils/handler/appErr.js";
import ApiFeature from "../../../utils/api.feature.js";
import { getItemById } from "../../../utils/handler/get.itemById.js";
import { deletedItemById } from "../../../utils/handler/delete.item.js";
import cloudinary from "../../../utils/cloudinary.js";
import brandModel from "../../../../db/models/brand.schema.js";
import productModel from "../../../../db/models/product.schema.js";
import reviewModel from "../../../../db/models/review.schema.js";


export const addReview = errHandler(async (req, res, next) => {
  let product=await productModel.findById(req.params.id);
 if (!product) {
   return next(new appErr("this product is not exists"));
   
 }
 req.body.user=req.user._id
 req.body.product = product._id;
 let foundedReview = await reviewModel.findOne({
   user: req.user._id,
   product: product._id,
 });
 if (foundedReview) return next(new appErr("you already reviewed this product"));
 
 let addedReview=await reviewModel(req.body).save()

  res.json({
    msg: "success",
    addedReview,
  });
});
export const updateReviews = errHandler(async (req, res, next) => {

   let { id } = req.params;
   let foundedReview = await reviewModel.findById(id);
   if (!foundedReview) return next(new appErr("this review is not exists"));
   if (foundedReview.user!=req.user._id) return next(new appErr("only user who has reviewed this review can update this"));
   let updatedReview = await reviewModel.findByIdAndUpdate(id,req.body,{new:true})
 res.json({
   msg: "success",
   updatedReview,
 });

 
});
export const deleteReview = errHandler(async (req, res, next) => {
    let { id } = req.params;
   let foundedReview = await reviewModel.findById(id);
  
   if (!foundedReview) return next(new appErr("this review is not exists"));

   if (foundedReview.user.toString() != req.user._id.toString())
     return next(
       new appErr("only user who has reviewed this review can delete this")
     );
   let deletedReview = await reviewModel.findByIdAndDelete(id);
   res.json({
     msg: "success",
     deletedReview,
   });
});

export const getAllReviews = errHandler(async (req, res, next) => {

 let apiFeature = new ApiFeature(
   reviewModel.find(),
   req.query
 );
 apiFeature.pagination().search().sort().fields();
 let allBrand = await apiFeature.dbQuery;

 res.json({
   msg: "success",
   allBrand,
 });


 
});