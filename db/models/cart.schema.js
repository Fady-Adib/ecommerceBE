import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "user is required"],
      unique: [true, "user code is unique"],
      ref: "user",
    },
    cartItems: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
    totalPrice: {
      type: Number,
    }, 
      discount: {
      type: Number,
    },
    totalPriceAfterDiscount: { type: Number },
 
  },

  {
    timestamps: true,
  }
);



const cartModel = mongoose.model("cart", schema);

export default cartModel;
