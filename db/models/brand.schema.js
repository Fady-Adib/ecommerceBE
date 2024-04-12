import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
      trim: true,
      unique: [true, "this category is existing"],
      minLength: [2, "too short brand name"],
      maxLength: [15, "too long brand name"],
    },
    slug: {
      type: "string",
      required: true,
    },
    logo: {
      type: "string",
    },
  },
  { timestamps: true }
);


const brandModel=mongoose.model('brand',schema)
export default brandModel;