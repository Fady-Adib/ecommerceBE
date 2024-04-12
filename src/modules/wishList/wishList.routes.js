import express from "express";

import validation from "../../middleWare/validation.js";
import * as wv from "./controller/wishList.validation.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";
import * as wc from "./controller/wishList.controller.js";

const wishListRoutes = express.Router();
wishListRoutes
  .route("/")
  .get(ac.auth, wc.getAllWishListForUser);;
  wishListRoutes
    .route("/:id")
    .post(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(wv.idVal),
      wc.addToWishList
    )
    .delete(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(wv.idVal),
      wc.removeFromWishList
    );
  

export default wishListRoutes;
