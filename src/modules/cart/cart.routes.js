import express from "express";

import validation from "../../middleWare/validation.js";
import * as cartVal from "./controller/cart.validation.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";
import * as cartCon from "./controller/cart.controller.js";
import { foundedCoupon } from "../../middleWare/foundedItems.js";

const cartRoutes = express.Router();
cartRoutes
  .route("/")
  .get(ac.auth, ac.allowTo("admin", "user"), cartCon.getCart)
  .post(
    ac.auth,
    ac.allowTo("admin", "user"),
    validation(cartVal.addCart),
    cartCon.createCart
  )
  .patch(
    ac.auth,
    ac.allowTo("admin", "user"),
    validation(cartVal.addCart),
    foundedCoupon,
    cartCon.updateCart
  )
  cartRoutes
    .route("/:id")
    .delete(
      ac.auth,
      ac.allowTo("admin","user"),
      validation(cartVal.idVal),
      cartCon.deleteItemInCart
    );

  
cartRoutes
  .route("/coupon/:code")
  .post(
    ac.auth,
    ac.allowTo("admin", "user"),
    validation(cartVal.applyCoupon),
    cartCon.applyCoupon
  );
export default cartRoutes;
