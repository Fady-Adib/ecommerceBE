import slugify from "slugify";
import errHandler from "../../../utils/handler/errHandlers.js";

import { v2 as cloudinary } from "cloudinary";
import appErr from "../../../utils/handler/appErr.js";
import categoryModel from "./../../../../db/models/category.schema.js";
import ApiFeature from "../../../utils/api.feature.js";
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

export const addCategory = errHandler(async (req, res, next) => {
  if (req.category) return next(new appErr("this category already exists"));
  cloudinary.uploader.upload(
    req.file.path,
    { folder: "Ecommerce" ,public_id: req.file.filename },
    async function (error, result) {
      if (error) {
        return next(error);
      } else {
        req.body.slug = slugify(req.body.title);
        req.body.image = result.secure_url;
        let preAddedCategory = categoryModel(req.body);
        let addedCategory = await preAddedCategory.save();
        res.json({
          msg: "success",
          addedCategory,
        });
      }
    }
  );
});
export const updateCategory = errHandler(async (req, res, next) => {
  if (req.category && req.category.title != req.body.title)
    return next(new appErr("this category already exists"));
  let { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  let foundedCategory = await categoryModel.findById(id);
  if (!foundedCategory) return next(new appErr("this category is not exists"));

  if (req.file) {
    cloudinary.uploader.upload(
      req.file.path,
      { public_id: req.file.filename },
      async function (error, result) {
        if (error) {
          return next(error);
        } else {
          req.body.image = result.secure_url;
          let updatedCategory = await categoryModel.findByIdAndUpdate(
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
    let updatedCategory = await categoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      msg: "success",
      updatedCategory,
    });
  }
});
export const deleteCategory = errHandler(async (req, res, next) => {
 deletedItemById(categoryModel, "Category", req, res, next);
     

});
export const getCategoryById = errHandler(async (req, res, next) => {
 getItemById(categoryModel, "category", req, res, next);
});
export const getAllCategory = errHandler(async (req, res, next) => {


  let apiFeature = new ApiFeature(categoryModel.find(),req.query);
  apiFeature.pagination().search()
  let allCategory = await apiFeature.dbQuery
  // let allCategory = await categoryModel.find().skip().limit(1)



  res.json({
    msg: "success",
    allCategory,
  });
});