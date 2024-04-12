import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
      trim: true,
      unique: [true, "this category is existing"],
      minLength: [3, "too short category name"],
      maxLength: [15, "too long category name"],
    },
    slug: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
    },
  },
  { timestamps: true }
);


const categoryModel=mongoose.model('category',schema)
export default categoryModel