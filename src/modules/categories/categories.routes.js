import express from "express";
import { singleUpload } from "../../utils/file.upload.js";
import * as cc from "./controller/categories.controller.js";
import validation from "../../middleWare/validation.js";
import * as cv from "./controller/categories.validation.js";
import { foundedCategory } from "../../middleWare/foundedItems.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";
import subCategoriesRoutes from "../subCategories/subCategories.routes.js";

const categoriesRoutes = express.Router();
categoriesRoutes.use("/:id/subCategory/",subCategoriesRoutes);
 
categoriesRoutes
  .route("/")
  .post(
    ac.auth,
    ac.allowTo("admin"),
    singleUpload("image"),
    validation(cv.addCategoryVal),
    foundedCategory,
    cc.addCategory
  )
  .get(ac.auth, ac.allowTo("admin", "user"), cc.getAllCategory);;
  categoriesRoutes
    .route("/:id")
    .put(
      ac.auth,
      ac.allowTo("admin"),
      singleUpload("image"),
      validation(cv.updateCategoryVal),
      foundedCategory,
      cc.updateCategory
    )
    .delete(
      ac.auth,
      ac.allowTo("admin"),
      validation(cv.idVal),
      cc.deleteCategory
    )
    .get(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(cv.idVal),
      cc.getCategoryById
    );


export default categoriesRoutes;
