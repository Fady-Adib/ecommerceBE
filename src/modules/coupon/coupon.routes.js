import express from "express";

import validation from "../../middleWare/validation.js";
import * as cov from "./controller/coupon.validation.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";
import * as coc from "./controller/coupon.controller.js";
import { foundedCoupon } from "../../middleWare/foundedItems.js";

const couponRoutes = express.Router();
couponRoutes
  .route("/")
  .get(ac.auth,
     ac.allowTo("admin"),
   coc.getAllCoupon)
  .post(
    ac.auth,
    ac.allowTo("admin"),
    validation(cov.addCoupon),
    foundedCoupon,
    coc.addCoupon
  );;
  couponRoutes
    .route("/:id")

    .delete(
      ac.auth,
      ac.allowTo("admin"),
      validation(cov.idVal),
      coc.deleteCoupon
    );
  

export default couponRoutes;
