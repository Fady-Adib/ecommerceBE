import express from "express";

import validation from "../../middleWare/validation.js";
import * as orderVal from "./controller/order.validation.js";
import * as ac from "../../middleWare/auth/controller/auth.controller.js";
import * as orderCon from "./controller/order.controller.js";
import { foundedCoupon } from "../../middleWare/foundedItems.js";

const orderRoutes = express.Router();
orderRoutes
  .route("/")
  .get(ac.auth, ac.allowTo("admin", "user"), orderCon.getAllOrders)
  orderRoutes
    .route("/cash")
    .post(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(orderVal.addOrder),
      orderCon.createCashOrder
    )
    .patch(
      ac.auth,
      ac.allowTo("admin", "user"),
      validation(orderVal.addCart),
      foundedCoupon,
      orderCon.updateCart
    );
  orderRoutes
    .route("/:id")
    .delete(
      ac.auth,
      ac.allowTo("admin","user"),
      validation(orderVal.idVal),
      orderCon.deleteItemInCart
    );

  
orderRoutes
  .route("/coupon/:code")
  .post(
    ac.auth,
    ac.allowTo("admin", "user"),
    validation(orderVal.applyCoupon),
    orderCon.applyCoupon
  );
export default orderRoutes;
