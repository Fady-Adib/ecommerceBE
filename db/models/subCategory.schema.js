import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
      trim: true,
      unique: [true, "this category is existing"],
      minLength: [3, "too short subCategory name"],
      maxLength: [15, "too long subCategory name"],
    },
    slug: {
      type: "string",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    image: {
      type: "string",
    },
  },
  { timestamps: true }
);


const subCategoryModel=mongoose.model('subCategory',schema)
export default subCategoryModel