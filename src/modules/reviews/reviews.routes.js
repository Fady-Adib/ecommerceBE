import express from "express";

import validation from "../../middleWare/validation.js";
import * as rv from "./controller/reviews.validation.js";
import {foundedBrand, foundedCategoryById, foundedSubCategory } from "../../middleWare/foundedItems.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";
import * as rc from "./controller/reviews.controller.js";

const reviewsRoutes = express.Router();
reviewsRoutes
  .route("/")
  .get(ac.auth, rc.getAllReviews);;
  reviewsRoutes
    .route("/:id")
    .post(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(rv.addReviewVal),
      rc.addReview
    )
    .put(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(rv.updateReviewVal),
      rc.updateReviews
    )
    .delete(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(rv.idVal),
      rc.deleteReview
    );
  

export default reviewsRoutes;
