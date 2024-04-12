import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";



export const addCategoryVal = Joi.object({
  title: Joi.string().min(4).max(15).trim().required(),
image:generalFieldsVal.file.required()
});
export const updateCategoryVal = Joi.object({
  title: Joi.string().min(4).max(15).trim().optional(),
  image: generalFieldsVal.file.optional(),
  id:generalFieldsVal.id.required()
});
export const idVal = Joi.object({
  id: generalFieldsVal.id.required(),
});
