import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";



export const addReviewVal = Joi.object({
  comment: Joi.string().min(5).max(500).trim().required(),
  rating: Joi.string().min(0).max(5).trim().required(),
  id: generalFieldsVal.id.required(),
  
});
export const updateReviewVal = Joi.object({
  comment: Joi.string().min(5).max(500).trim().optional(),
  rating: Joi.string().min(0).max(5).trim().optional(),
  id: generalFieldsVal.id.optional(),
});
export const idVal = Joi.object({
  id: generalFieldsVal.id.required(),
});
