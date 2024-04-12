import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";


export const addCart = Joi.object({
  product: generalFieldsVal.id.required(),
  quantity: Joi.number().optional().min(1),
});

export const idVal = Joi.object({
  id: generalFieldsVal.id.required(),
});
export const applyCoupon = Joi.object({
  code: Joi.string().required().min(4).max(15),
});

