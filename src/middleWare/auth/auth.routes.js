import express from "express";
import * as ac from "./controller/auth.controller.js";
import { foundedUser } from "../foundedItems.js";
import validation from "../validation.js";
import * as av from "./controller/auth.validation.js";

const authRoutes = express.Router();
authRoutes.route("/signup").post(validation(av.signUpVal),foundedUser,ac.signUp );
authRoutes.route("/verified/:emailToken").get(ac.verify);
authRoutes.route("/login")
  .post(validation(av.signInVal), foundedUser, ac.signIn);
export default authRoutes;
