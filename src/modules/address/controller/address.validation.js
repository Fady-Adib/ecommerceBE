import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";


export const addAddress = generalFieldsVal.address.required()

export const idVal = Joi.object({
  id: generalFieldsVal.id.required(),
});
