import Joi from "joi";
import { generalFieldsVal } from "../../../utils/handler/general.Field.Validation.js";




export const idVal = Joi.object({
  id: generalFieldsVal.id.required(),
});
