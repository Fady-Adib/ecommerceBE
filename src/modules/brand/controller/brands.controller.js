import slugify from "slugify";
import errHandler from "../../../utils/handler/errHandlers.js";


import appErr from "../../../utils/handler/appErr.js";
import ApiFeature from "../../../utils/api.feature.js";
import { getItemById } from "../../../utils/handler/get.itemById.js";
import { deletedItemById } from "../../../utils/handler/delete.item.js";
import cloudinary from "../../../utils/cloudinary.js";
import brandModel from "../../../../db/models/brand.schema.js";


export const addBrand = errHandler(async (req, res, next) => {
  if (req.brand) return next(new appErr("this brand already exists"));
  cloudinary.uploader.upload(
    req.file.path,
    { folder: "Ecommerce", public_id: req.file.filename },
    async function (error, result) {
      if (error) {
        return next(error);
      } else {
        req.body.slug = slugify(req.body.title);
        req.body.logo = result.secure_url;
        let preAddedBrand = brandModel(req.body);
        let addedBrand = await preAddedBrand.save();
        res.json({
          msg: "success",
          addedBrand,
        });
      }
    }
  );
});
export const updateBrand = errHandler(async (req, res, next) => {

   let { id } = req.params;
   let foundedBrand = await brandModel.findById(id);
   if (!foundedBrand) return next(new appErr("this brand is not exists"));
  if (req.brand && foundedBrand.title != req.body.title)
    return next(new appErr("this brand already exists"));
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

if (req.file) {
    cloudinary.uploader.upload(
      req.file.path,
      { public_id: req.file.filename },
      async function (error, result) {
        if (error) {
          return next(error);
        } else {
          req.body.logo = result.secure_url;
          let updatedBrand = await brandModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
          );
          res.json({
            msg: "success",
            updatedBrand,
          });
        }
      }
    );
  } else {
    let updatedBrand = await brandModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      msg: "success",
      updatedBrand,
    });
  }
});
export const deleteBrand = errHandler(async (req, res, next) => {
     deletedItemById(brandModel, "brand", req, res, next);
});
export const getBrandById = errHandler(async (req, res, next) => {
getItemById(brandModel,"brand",req,res,next)
  

});
export const getAllBrand = errHandler(async (req, res, next) => {

 let apiFeature = new ApiFeature(
   brandModel.find(),
   req.query
 );
 apiFeature.pagination().search();
 let allBrand = await apiFeature.dbQuery;

 res.json({
   msg: "success",
   allBrand,
 });


 
});