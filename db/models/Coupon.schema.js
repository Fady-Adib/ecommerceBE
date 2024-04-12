import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema(
  {
    code: {
      type: "string",
      required: [true, "coupon code is required"],
      unique: [true, "coupon code is unique"],
      minLength: [4, "too short"],
      maxLength: [15, "too long"],
      trim: true,
    },
    discount: {
      type: "number",
      min: [0, "Must be at least 0"],
      required: [true, "discount is required"],
    },
    expires: {
      type: Date,
      required: [true, "expires is required"],
    },
  },

  {
    timestamps: true,
  }
);



const couponModel = mongoose.model("coupon", schema);

export default couponModel;
