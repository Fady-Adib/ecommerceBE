import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";


export const addOrder = Joi.object({
  addressId: generalFieldsVal.id.required()
});

export const idVal = Joi.object({
  id: generalFieldsVal.id.required(),
});
export const applyCoupon = Joi.object({
  code: Joi.string().required().min(4).max(15),
});
