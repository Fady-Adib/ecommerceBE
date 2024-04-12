import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";
export const updateVal = Joi.object({
  firstName: Joi.string().min(4).max(15).trim().optional(),
  lastName: Joi.string().optional().min(4).max(15).trim(),
  age: Joi.number().min(16).max(90).optional(),
  gender: Joi.string()
    .optional()
    .valid("male", "female", "other", "prefer not to say"),
  phone: generalFieldsVal.phone.optional(),
  role: Joi.string().valid("user", "admin").insensitive().optional(),
});
export const updatePasswordVal = Joi.object({
  oldPassword: generalFieldsVal.password.required(),
  password: generalFieldsVal.password.required(),
  rePassword: generalFieldsVal.rePassword.required(),
});
export const forgetPasswordVal = Joi.object({
  email:generalFieldsVal.email.required()
});
export const restPasswordVal = Joi.object({
  email: generalFieldsVal.email.required(),
  otp: Joi.number().integer().required(),
  password: generalFieldsVal.password.required(),
  rePassword: generalFieldsVal.rePassword.required(),
});


