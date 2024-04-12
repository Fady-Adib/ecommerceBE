import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";

export const signUpVal = Joi.object({
  firstName: Joi.string().required().min(4).max(15).trim(),
  lastName: Joi.string().required().min(4).max(15).trim(),
  email: generalFieldsVal.email.required(),
  password: generalFieldsVal.password.required(),
  rePassword: generalFieldsVal.rePassword.required(),
  age: Joi.number().min(16).max(90).required(),
  gender: Joi.string()
    .required()
    .valid("male", "female", "other", "prefer not to say"),
  phone: generalFieldsVal.phone.required(),
  role: Joi.string().valid("user", "admin").insensitive().required(),
});
export const signInVal = Joi.object({
  emailOrPhone:Joi.alternatives().try( generalFieldsVal.email,
 generalFieldsVal.phone).required(),
  password: generalFieldsVal.password.required(),
});
