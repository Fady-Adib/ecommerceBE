import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";



export const addSubCategoryVal = Joi.object({
  title: Joi.string().min(3).max(15).trim().required(),
  category: generalFieldsVal.id.required(),
  image: generalFieldsVal.file.required(),
});
export const updateSubCategoryVal = Joi.object({
  title: Joi.string().min(3).max(15).trim().optional(),
  image: generalFieldsVal.file.optional(),
  id: generalFieldsVal.id.required(),
  category: generalFieldsVal.id.optional(),
});
export const idVal = Joi.object({
  id: generalFieldsVal.id.required(),
});
