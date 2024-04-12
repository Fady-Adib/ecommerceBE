import slugify from "slugify";
import errHandler from "../../../utils/handler/errHandlers.js";

import appErr from "../../../utils/handler/appErr.js";
import ApiFeature from "../../../utils/api.feature.js";
import subCategoryModel from "../../../../db/models/subCategory.schema.js";
import { getItemById } from "../../../utils/handler/get.itemById.js";
import { deletedItemById } from "../../../utils/handler/delete.item.js";
import cloudinary from "./../../../utils/cloudinary.js";
import productModel from "../../../../db/models/product.schema.js";

let uploadImageToCloudinary = (path, fileName, next)=>{
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { folder: "Ecommerce", public_id: fileName },
      async function (error, result) {
        if (error) {
          return next(error);
        } else {
          let urlImg = result.secure_url;
          resolve(urlImg);
       
        }
      }
    );
  });
}


export const addProduct = errHandler(async (req, res, next) => {
  if (!req.subCategory) return next(new appErr("this subCategory is not exist"));
  if (!req.category) return next(new appErr("this category is not exist"));
  if (!req.brand) return next(new appErr("this brand is not exist"));
  req.body.slug = slugify(req.body.title);

let cover =await uploadImageToCloudinary(req.files.image[0].path,req.files.image[0].filename,next)

req.body.cover=cover

let images = await Promise.all(
  await req.files.images.map(async (img) => {
  return await uploadImageToCloudinary(img.path, img.filename, next);
})
)
req.body.images = images;


 let preAddedProduct = productModel(req.body);
 let addedProduct = await preAddedProduct.save();
 res.json({
   msg: "success",
   addedProduct,
 });




  
 

       
});
export const updateProduct = errHandler(async (req, res, next) => {
  let { id } = req.params;
  let foundedProduct = await productModel.findById(id);

  if (!foundedProduct) return next(new appErr("this Product is not exists"));
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  if (req.body.category) {
    if (!req.category) return next(new appErr("this category is not exist"));
  }
  if (req.body.subCategory) {
    if (!req.subCategory)
      return next(new appErr("this subCategory is not exist"));
  }
  if (req.body.brand) {
    if (!req.brand) return next(new appErr("this brand is not exist"));
  }

  if (req.files.image || req.files.images) {
    let cover = await uploadImageToCloudinary(
      req.files.image[0].path,
      req.files.image[0].filename,
      next
    );
    req.body.cover = cover;

    if (req.files.images) {
      let images = await Promise.all(
        await req.files.images.map(async (img) => {
          return await uploadImageToCloudinary(img.path, img.filename, next);
        })
      );
      req.body.images = images;
    }
  }
  let updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({ msg: "success", updatedProduct });
});
export const deleteProduct = errHandler(async (req, res, next) => {
  deletedItemById(productModel, "product", req, res, next);
});
export const getProductById = errHandler(async (req, res, next) => {
  getItemById(productModel, "Product", req, res, next);
});
export const getAllProduct = errHandler(async (req, res, next) => {
  let { id } = req.params;
  if (id) {
    let apiFeature = new ApiFeature(
      subCategoryModel
        .find({ category: id })
        .populate({ path: "category", select: "_id title" }),
      req.query
    );
    apiFeature.pagination().search();
    let allSubCategory = await apiFeature.dbQuery;

    res.json({
      msg: "success",
      allSubCategory,
    });
  } else {
    let apiFeature = new ApiFeature(
      productModel
        .find()
        .populate([
          { path: "category", select: "_id title" },
          { path: "subCategory", select: "_id title" },
          { path: "brand", select: "_id title" }]
        ),
      req.query
    );
    apiFeature.pagination().search().filter().sort().fields();
    let allProduct = await apiFeature.dbQuery;
    res.json({
      msg: "success",
      allProduct,
    });
  }
});
