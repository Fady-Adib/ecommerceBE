
import errHandler from "../../../utils/handler/errHandlers.js";


import appErr from "../../../utils/handler/appErr.js";
import ApiFeature from "../../../utils/api.feature.js";
import productModel from "../../../../db/models/product.schema.js";


import cartModel from "../../../../db/models/cart.schema.js";
import couponModel from "../../../../db/models/Coupon.schema.js";
import orderModel from "../../../../db/models/order.schema.js";




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
console.log(address);
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