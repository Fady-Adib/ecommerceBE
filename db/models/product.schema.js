import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
      trim: true,
      minLength: [3, "too short product name"],
      maxLength: [15, "too long product name"],
    },
    slug: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
      trim: true,
      minLength: [5, "too short"],
      maxLength: [500, "too long"],
    },
    price: {
      type: "number",
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: "number",
      required: true,
      min: 0,
    },
    rate: {
      type: "number",
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: "number",
      min: 0,
    },
    sold: {
      type: "number",
      min: 0,
    },
    quantity: {
      type: "number",
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "subCategory",
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
      required: true,
    },
    images: {
      type: [String],
    },
    cover: {
      type: "string",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

schema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});
schema.pre(/^find/,function(){
  this.populate("reviews")
})


const productModel=mongoose.model('product',schema)
export default productModel;