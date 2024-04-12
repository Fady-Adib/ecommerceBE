import express from "express";
import { fieldUpload} from "../../utils/file.upload.js";
import * as pc from "./controller/products.controller.js";
import validation from "../../middleWare/validation.js";
import * as pv from "./controller/products.validation.js";
import {foundedBrandById, foundedCategoryById, foundedSubCategory, foundedSubCategoryById } from "../../middleWare/foundedItems.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";

const productRoutes = express.Router({mergeParams:true});
 
productRoutes
  .route("/")
  .post(
    ac.auth,
    ac.allowTo("admin"),
    fieldUpload([
      { name: "image", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(pv.addProductVal),
    foundedCategoryById,
    foundedBrandById,
    foundedSubCategoryById,
    pc.addProduct
  )
.get(ac.auth, ac.allowTo("admin", "user"), pc.getAllProduct);;
  productRoutes
    .route("/:id")
    .put(
      ac.auth,
      ac.allowTo("admin"),
      fieldUpload([
      { name: "image", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
      foundedCategoryById,
      foundedBrandById,
      foundedSubCategoryById,
      // validation(pv.updateProductVal),
      pc.updateProduct
    )
    .delete(
      ac.auth,
      ac.allowTo("admin"),
      validation(pv.idVal),
      pc.deleteProduct
    )
    .get(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(pv.idVal),
      pc.getProductById
    );


export default productRoutes;
