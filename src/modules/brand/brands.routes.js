import express from "express";
import { singleUpload } from "../../utils/file.upload.js";
import validation from "../../middleWare/validation.js";
import * as bv from "./controller/brands.validation.js";
import {foundedBrand, foundedCategoryById, foundedSubCategory } from "../../middleWare/foundedItems.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";
import * as bc from "./controller/brands.controller.js";

const brandsRoutes = express.Router();
brandsRoutes
  .route("/")
  .post(
    ac.auth,
    ac.allowTo("admin"),
    singleUpload("image"),
    validation(bv.addBrandVal),
    foundedBrand,
    foundedCategoryById,
    bc.addBrand
  )
  .get(ac.auth, ac.allowTo("admin", "user"), bc.getAllBrand);;
  brandsRoutes
    .route("/:id")
    .put(
      ac.auth,
      ac.allowTo("admin"),
      singleUpload("image"),
      validation(bv.updateBrandVal),
      foundedSubCategory,
      foundedCategoryById,
      bc.updateBrand
    )
    .delete(
      ac.auth,
      ac.allowTo("admin"),
      validation(bv.idVal),
      bc.deleteBrand
    )
    .get(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(bv.idVal),
      bc.getBrandById
    );


export default brandsRoutes;
