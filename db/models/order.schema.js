import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "user is required"],
      ref: "user",
    },
    cartItems: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
    totalOrderPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },

    paymentMethod: {
      type: String,
      enum: {
        values: ["cash", "credit"],
        message: `{VALUE} is not supported`,
      },
      default: "cash",
    },

    isPaid: { type: Boolean, default: false },

    shippingAddress: {
      name: { type: String, required: true },
      fullAddress: { type: String, required: true },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      city: { type: String, required: true },
      addressLabel: {
        type: String,
        enum: {
          values: ["home", "work"],
          message: `{VALUE} is not supported`,
        },
        trim: true,
      },
      country: { type: String, required: true },
    },

    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
  },

  {
    timestamps: true,
  }
);



const orderModel = mongoose.model("order", schema);

export default orderModel;
