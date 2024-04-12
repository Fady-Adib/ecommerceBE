import Joi from "joi"



export const generalFieldsVal = {
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  ),
  rePassword: Joi.valid(Joi.ref("password")),
  id: Joi.string().hex().length(24),
  phone: Joi.string().pattern(/^(?:\+20)?1[0-9]{9}$/),
  file: Joi.object().keys({
    size: Joi.number().positive().max(5048576).required(),
    path: Joi.string().required(),
    filename: Joi.string().required(),
    destination: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg").required(),
    encoding: Joi.string().required(),
    originalname: Joi.string().required(),
    fieldname: Joi.string().required(),
  }),
  address: Joi.object().keys({
    name: Joi.string().required(),
    fullAddress: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^(?:\+20)?1[0-9]{9}$/)
      .required(),
    addressLabel: Joi.string()
      .valid("home", "work")
      .required(),
    country: Joi.string().required(),
  }),
};
