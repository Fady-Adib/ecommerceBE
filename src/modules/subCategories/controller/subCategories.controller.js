import slugify from "slugify";
import errHandler from "../../../utils/handler/errHandlers.js";

import { v2 as cloudinary } from "cloudinary";
import appErr from "../../../utils/handler/appErr.js";
import categoryModel from "../../../../db/models/category.schema.js";
import ApiFeature from "../../../utils/api.feature.js";
import subCategoryModel from "../../../../db/models/subCategory.schema.js";
import { getItemById } from "../../../utils/handler/get.itemById.js";
import { deletedItemById } from "../../../utils/handler/delete.item.js";

// cloudinary.config({
//   cloud_name: String(process.env.CLOUD_NAME),
//   api_key: String(process.env.API_KEY),
//   api_secret: String(process.env.API_SECRET),
// });
cloudinary.config({
  cloud_name: "dbkwnpv6y",
  api_key: "163295691431665",
  api_secret: "SgICFGD67KW1Ka2eqEt154jk-7M",
});

export const addSubCategory = errHandler(async (req, res, next) => {
  if (req.subCategory) return next(new appErr("this subCategory already exists"));
  if (!req.category) return next(new appErr("this category is not exist"));
  cloudinary.uploader.upload(
    req.file.path,
    { folder: "Ecommerce" ,public_id: req.file.filename },
    async function (error, result) {
      if (error) {
        return next(error);
      } else {
        req.body.slug = slugify(req.body.title);
        req.body.image = result.secure_url;
        let preAddedSubCategory = subCategoryModel(req.body);
        let addedSubCategory = await preAddedSubCategory.save();
        res.json({
          msg: "success",
          addedSubCategory,
        });
      }
    }
  );
});
export const updateSubCategory = errHandler(async (req, res, next) => {

   let { id } = req.params;
   let foundedSubCategory = await subCategoryModel.findById(id);
   if (!foundedSubCategory) return next(new appErr("this subCategory is not exists"));
  if (req.subCategory && foundedSubCategory.title != req.body.title)
    return next(new appErr("this subcategory already exists"));
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
 if (req.body.category) {
if (!req.category) return next(new appErr("this category is not exist"));
}
if (req.file) {
    cloudinary.uploader.upload(
      req.file.path,
      { public_id: req.file.filename },
      async function (error, result) {
        if (error) {
          return next(error);
        } else {
          req.body.image = result.secure_url;
          let updatedCategory = await subCategoryModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
          );
          res.json({
            msg: "success",
            updatedCategory,
          });
        }
      }
    );
  } else {
    let updatedCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      msg: "success",
      updatedCategory,
    });
  }
});
export const deleteSubCategory = errHandler(async (req, res, next) => {
     deletedItemById(subCategoryModel, "subCategory", req, res, next);
});
export const getSubCategoryById = errHandler(async (req, res, next) => {
getItemById(subCategoryModel,"subCategory",req,res,next)
  

});
export const getAllSubCategory = errHandler(async (req, res, next) => {
let {id}=req.params
if (id) {
  let apiFeature = new ApiFeature(
    subCategoryModel.find({category:id}).populate({ path: "category", select: "_id title" }),
    req.query
  );
  apiFeature.pagination().search();
  let allSubCategory = await apiFeature.dbQuery;

  res.json({
    msg: "success",
    allSubCategory,
  });
  
}else{
 let apiFeature = new ApiFeature(
   subCategoryModel.find().populate({ path: "category", select: "_id title" }),
   req.query
 );
 apiFeature.pagination().search();
 let allSubCategory = await apiFeature.dbQuery;

 res.json({
   msg: "success",
   allSubCategory,
 });

}
 
});