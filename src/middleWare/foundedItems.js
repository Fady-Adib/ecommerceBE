import couponModel from "../../db/models/Coupon.schema.js";
import categoryModel from "../../db/models/category.schema.js";
import subCategoryModel from "../../db/models/subCategory.schema.js";
import userModel from "../../db/models/user.schema.js";
import appErr from "../utils/handler/appErr.js";
import errHandler from "../utils/handler/errHandlers.js";
import brandModel from "./../../db/models/brand.schema.js";

export const foundedUser = errHandler(async (req, res, next) => {
  let { email, phone } = req.body;
  if (req.body.emailOrPhone) {
    email = req.body.emailOrPhone;
    phone = req.body.emailOrPhone;
  }
  let foundedUser = await userModel.findOne({ $or: [{ email }, { phone }] });
  req.existUser = foundedUser;
  next();
});
export const foundedCategory = errHandler(async (req, res, next) => {
  let { title } = req.body;
  let foundedCategory = await categoryModel.findOne({ title });
  req.category = foundedCategory;
  next();
});
export const foundedSubCategory = errHandler(async (req, res, next) => {
  let { title } = req.body;

  let foundedSubCategory = await subCategoryModel.findOne({ title });
  req.subCategory = foundedSubCategory;
  next();
});
export const foundedCategoryById = errHandler(async (req, res, next) => {
  let { category } = req.body;

  let foundedCategory = await categoryModel.findById(category);
  req.category = foundedCategory;
  next();
});
export const foundedBrand = errHandler(async (req, res, next) => {
  let { title } = req.body;

  let foundedBrand = await brandModel.findOne({ title });
  req.brand = foundedBrand;
  next();
});

export const foundedSubCategoryById = errHandler(async (req, res, next) => {
  let { subCategory } = req.body;

  let foundedSubCategory = await subCategoryModel.findById(subCategory);
  req.subCategory = foundedSubCategory;
  next();
});
export const foundedBrandById = errHandler(async (req, res, next) => {
  let { brand } = req.body;
  let foundedBrand = await brandModel.findById(brand);
  req.brand = foundedBrand;
  next();
});
export const foundedCoupon = errHandler(async (req, res, next) => {
  let { code } = req.body 
  let foundedCoupon = await couponModel.findOne({ code });
  req.coupon = foundedCoupon;
  next();
});

