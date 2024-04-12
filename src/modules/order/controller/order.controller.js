
import errHandler from "../../../utils/handler/errHandlers.js";


import appErr from "../../../utils/handler/appErr.js";
import ApiFeature from "../../../utils/api.feature.js";
import productModel from "../../../../db/models/product.schema.js";
import cartModel from "../../../../db/models/cart.schema.js";
import couponModel from "../../../../db/models/Coupon.schema.js";
import orderModel from "../../../../db/models/order.schema.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51NxC9KATJsVBadGG7imBN8PphmqzfQuOOW6VaJQhyXwWCstF0CY1UmGc5VoOiMiXetISvt15G5PQ1BFYMPjU56DO00h5c7yOLF"
);


const calcPrice= async(cart)=>{
  let totalPrice = 0;
 cart.cartItems.forEach((item) => (totalPrice += item.quantity * item.price))
cart.totalPrice=totalPrice
return totalPrice
}
const applyDiscount=async(cart)=>{
cart.totalPriceAfterDiscount =cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
}
export const createCashOrder= errHandler(async (req, res, next) => {
  let { addressId } = req.body;
console.log(req.user);
let FoundedCart=await cartModel.findOne({user:req.user._id})
let address =req.user.addresses.find((ele) => ele._id == addressId);
if (!address) return next(new appErr("this address is not exists"));
let order = new orderModel({
  user: req.user._id,
  cartItems: FoundedCart.cartItems,
  totalOrderPrice: FoundedCart.totalPriceAfterDiscount,
  discount: FoundedCart.discount,
  shippingAddress: address,
});
if ( order) {
  let option=order.cartItems.map(item=>(
    { updateOne :{
         filter: {_id:item.product},
         update: {$inc:{
          quantity:-item.quantity,
          sold:item.quantity
         }},
                
      }
    }
  )
  )
 await productModel.bulkWrite(option);
 await cartModel.findOneAndDelete({ user: req.user._id });
 let ordered=await order.save()
 res.json({
   msg: "success",
   ordered,
 });
}


});
export const deleteItemInCart = errHandler(async (req, res, next) => {
 let FoundedCart = await cartModel.findOne({ user: req.user._id });
  if (!FoundedCart) return next(new appErr("this cart is not exists"));
let item = FoundedCart.cartItems.find((item) => item.product == req.params.id);
 if (!item) return next(new appErr("this item is not exists"));
  FoundedCart.cartItems.pull(item);
calcPrice(FoundedCart);
  applyDiscount(FoundedCart);
let deletedItem = await FoundedCart.save();
  res.json({
    msg: "success",
    deletedItem,
  });
});
export const getAllOrders = errHandler(async (req, res, next) => {
 let apiFeature = new ApiFeature(
   orderModel.find({ user: req.user._id }).populate([
     { path: "cartItems.product", select: "title _id" },
     { path: "user", select: "_id firstName" },
   ]),
   req.query
 );
 apiFeature.fields();
 let orders = await apiFeature.dbQuery;
 if (!orders) return next(new appErr("you didn't have any order yet"));
 res.json({
   msg: "success",
   orders,
 });

});
export const checkout = errHandler(async (req, res, next) => {
    let { addressId } = req.body;
  let FoundedCart = await cartModel.findOne({ user: req.user._id });
  let address = req.user.addresses.find((ele) => ele._id == addressId);
  if (!address) return next(new appErr("this address is not exists"));
  let order = new orderModel({
    user: req.user._id,
    cartItems: FoundedCart.cartItems,
    totalOrderPrice: FoundedCart.totalPriceAfterDiscount,
    discount: FoundedCart.discount,
    shippingAddress: address,
  });
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        
          currency: "egp",
          product_data: {
            name: "Total Price", // Display name for the total price
          },
          unit_amount: FoundedCart.totalPriceAfterDiscount * 100, // Convert total price to cents
        
        metadata: address,
      },
    ],
    mode: "payment",
    success_url: `https://binostore.onrender.com/api/v1/cart`,
    cancel_url: `https://binostore.onrender.com/api/v1/order`,
    customer_email: req.user.email,
    client_reference_id: FoundedCart._id,
  });
  res.json({
    msg: "success",
    session,
  });
});
