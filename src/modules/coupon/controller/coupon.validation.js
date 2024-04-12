import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";


export const addCoupon = Joi.object({
  code: Joi.string().required().min(4).max(15),
  discount: Joi.number().required().min(0),
  expires: Joi.date().required(),
});

export const idVal = Joi.object({
  id: generalFieldsVal.id.required(),
});
