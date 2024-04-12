import express from "express";
import { singleUpload } from "../../utils/file.upload.js";
import * as sc from "./controller/subCategories.controller.js";
import validation from "../../middleWare/validation.js";
import * as sv from "./controller/subCategories.validation.js";
import {foundedCategoryById, foundedSubCategory } from "../../middleWare/foundedItems.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";

const subCategoriesRoutes = express.Router({mergeParams:true});
 
subCategoriesRoutes
  .route("/")
  .post(
    ac.auth,
    ac.allowTo("admin"),
    singleUpload("image"),
    validation(sv.addSubCategoryVal),
    foundedSubCategory,
    foundedCategoryById,
    sc.addSubCategory
  )
  .get(ac.auth, ac.allowTo("admin", "user"), sc.getAllSubCategory);;
  subCategoriesRoutes
    .route("/:id")
    .put(
      ac.auth,
      ac.allowTo("admin"),
      singleUpload("image"),
      validation(sv.updateSubCategoryVal),
      foundedSubCategory,
      foundedCategoryById,
      sc.updateSubCategory
    )
    .delete(
      ac.auth,
      ac.allowTo("admin"),
      validation(sv.idVal),
      sc.deleteSubCategory
    )
    .get(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(sv.idVal),
      sc.getSubCategoryById
    );


export default subCategoriesRoutes;
