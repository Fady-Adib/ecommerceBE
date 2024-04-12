
import errHandler from "../../../utils/handler/errHandlers.js";


import appErr from "../../../utils/handler/appErr.js";
import ApiFeature from "../../../utils/api.feature.js";
import productModel from "../../../../db/models/product.schema.js";


import cartModel from "../../../../db/models/cart.schema.js";
import couponModel from "../../../../db/models/Coupon.schema.js";




const calcPrice= async(cart)=>{
  let totalPrice = 0;
 cart.cartItems.forEach((item) => (totalPrice += item.quantity * item.price))
cart.totalPrice=totalPrice
return totalPrice
}
const applyDiscount=async(cart)=>{
  let discount = cart.discount || 0
cart.totalPriceAfterDiscount =cart.totalPrice - (cart.totalPrice * discount) / 100;
}
export const createCart= errHandler(async (req, res, next) => {
  let {product}=req.body

let FoundedCart=await cartModel.findOne({user:req.user._id})
let foundedProduct = await productModel.findById(product).select("price");
if (!foundedProduct)  return next(new appErr("this product is not exists"));
req.body.price=foundedProduct.price
if (FoundedCart) {
let item = FoundedCart.cartItems.find(ele=>ele.product==req.body.product)
if (item) {
item.quantity+=req.body.quantity||1
calcPrice(FoundedCart);
 applyDiscount(FoundedCart);
  let updateCart= await FoundedCart.save();
   res.json({
     msg: "success",
     updateCart,
   });
}else{
    FoundedCart.cartItems.push(req.body)
    calcPrice(FoundedCart);
     applyDiscount(FoundedCart);
await FoundedCart.save();
res.json({
  msg: "success",
  FoundedCart,
});

}
}else{
  let addedCart=new cartModel({user:req.user._id,cartItems:[req.body]})
calcPrice(addedCart);

addedCart =await addedCart.save()
     res.json({
       msg: "success",
       addedCart,
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
export const getCart = errHandler(async (req, res, next) => {
 let apiFeature = new ApiFeature(
   cartModel.findOne({user:req.user._id}),
   req.query
 );
 apiFeature.fields();
 let cart = await apiFeature.dbQuery;
 if (!cart) return next(new appErr("you didn't have a cart"));
 res.json({
   msg: "success",
   cart,
 });

});
export const updateCart = errHandler(async (req, res, next) => {   
  let { product } = req.body;
  let FoundedCart = await cartModel.findOne({ user: req.user._id });
  let foundedProduct = await productModel.findById(product).select("price");
  if (!foundedProduct) return next(new appErr("this product is not exists"));
  req.body.price = foundedProduct.price;
  if (FoundedCart) {
    let item = FoundedCart.cartItems.find(
      (ele) => ele.product == req.body.product
    );
    if (item) {
      item.quantity = req.body.quantity || 1;
      if (item.quantity==0) {
          FoundedCart.cartItems.pull(item);
      }
      calcPrice(FoundedCart);
          applyDiscount(FoundedCart);
      let updateCart = await FoundedCart.save();
      res.json({
        msg: "success",
        updateCart,
      });
    } else {
      return next(new appErr("this item is not exists"));
    }
  } 
});
export const applyCoupon = errHandler(async (req, res, next) => {
  let { code } = req.params;
  let foundedCoupon = await couponModel.findOne({ code });
if (!foundedCoupon) return next(new appErr("this coupon is not available"));
let couponTime = Number(foundedCoupon.expires);
let timeNow = Number(new Date());
if (timeNow > couponTime)  return next(new appErr("this coupon is expired"));
 let FoundedCart = await cartModel.findOne({ user: req.user._id });
if (!FoundedCart) return next(new appErr("you didn't have a cart"));
 FoundedCart.discount = foundedCoupon.discount
 applyDiscount(FoundedCart);
//  FoundedCart.totalPriceAfterDiscount = FoundedCart.totalPrice-(FoundedCart.totalPrice * foundedCoupon.discount) / 100
 let updatedCart =await FoundedCart.save()  
  res.json({
    msg: "success",
    updatedCart,
  });
});
