

import express from "express";
import * as uc from "./controller/users.controller.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";
import validation from "../../middleWare/validation.js";
import * as uv from "./controller/users.validation.js";
import { foundedUser } from "../../middleWare/foundedItems.js";

const userRoutes = express.Router();

userRoutes
  .route("/")
  .put(validation(uv.updateVal), foundedUser, ac.auth, uc.updateUser)
  .delete( ac.auth, uc.deleteUser)
  .patch(validation(uv.updatePasswordVal), ac.auth, uc.updatePassword);


 userRoutes
   .route("/forgetPassword")
   .post(validation(uv.forgetPasswordVal), foundedUser, uc.forgetPassword);

 userRoutes
   .route("/restpassword")
   .post(validation(uv.restPasswordVal), foundedUser, uc.restPassword);


export default userRoutes;