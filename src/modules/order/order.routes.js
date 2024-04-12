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
    orderRoutes
      .route("/checkout")
      .post(
        ac.auth,
        ac.allowTo("admin", "user"),
        validation(orderVal.addOrder),
        orderCon.checkout
      );
  orderRoutes
    .route("/:id")
    .delete(
      ac.auth,
      ac.allowTo("admin","user"),
      validation(orderVal.idVal),
      orderCon.deleteItemInCart
    );

  

export default orderRoutes;
