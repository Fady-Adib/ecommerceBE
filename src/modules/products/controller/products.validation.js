import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";



export const addProductVal = Joi.object({
  title: Joi.string().min(3).max(15).trim().required(),
  description: Joi.string().min(5).max(500).trim().required(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  category: generalFieldsVal.id.required(),
  subCategory: generalFieldsVal.id.required(),
  brand: generalFieldsVal.id.required(),
  images: Joi.array().items(generalFieldsVal.file.required()).required(),
  image: generalFieldsVal.file.required(),
});
export const updateProductVal = Joi.object({
  title: Joi.string().min(3).max(15).trim().optional(),
  description: Joi.string().min(5).max(500).trim().optional(),
  price: Joi.number().min(0).optional(),
  priceAfterDiscount: Joi.number().min(0).optional(),
  quantity: Joi.number().min(0).optional(),
  category: generalFieldsVal.id.optional(),
  subCategory: generalFieldsVal.id.optional(),
  brand: generalFieldsVal.id.optional(),
  images: Joi.array().items(generalFieldsVal.file.optional()),
  image: generalFieldsVal.file.optional(),
});
export const idVal = Joi.object({
  id: generalFieldsVal.id.required(),
});
