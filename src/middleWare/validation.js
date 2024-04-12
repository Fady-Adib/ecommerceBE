import appErr from "../utils/handler/appErr.js";
import { signUpVal } from "./auth/controller/auth.validation.js";

const validation = (valSchema) => {
  return (req, res, next) => {
    let errMsgs = [];
    let valObj = {};
    if (req.file || req.files) {
    
      if (req.file) {
        valObj = { image: req.file, ...req.body, ...req.params };
      } else {
         valObj = {
           image: req.files.image[0],
           images: req.files.images,
           ...req.body,
           ...req.params,
         };
      }
    } else {
      valObj = { ...req.body, ...req.params };
    }
    let { error } = valSchema.validate(valObj, { abortEarly: false });

    if (error) {
      error.details.forEach((err) => errMsgs.push(err.message));
      next(new appErr(errMsgs, 401));
    } else {
      next();
    }
  };
};
export default validation;
