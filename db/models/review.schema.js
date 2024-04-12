import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    comment: {
      type: "string",
      required: true,
      trim: true,
      unique: false,
      minLength: [5, "too short brand name"],
      maxLength: [500, "too long brand name"],
    },
    rating: {
      type: "number",
      min: [0, "too short brand name"],
      max: [5, "too long brand name"],
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  { timestamps: true }
);


const reviewModel = mongoose.model("review", schema);
export default reviewModel;