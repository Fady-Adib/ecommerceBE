import express from "express";

import validation from "../../middleWare/validation.js";
import * as adv from "./controller/address.validation.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";
import * as adc from "./controller/address.controller.js";

const addressRoutes = express.Router();
addressRoutes
  .route("/")
  .get(ac.auth, adc.getAllAddresses)
  .post(
    ac.auth,
    ac.allowTo("admin", "user"),
    validation(adv.addAddress),
    adc.addAddress
  );
  addressRoutes
    .route("/:id")
    
    .delete(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(adv.idVal),
      adc.removeAddress
    );
  

export default addressRoutes;
