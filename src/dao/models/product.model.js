import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  thumbnail: String,
  code: String,
  stock: String,
});

export const productModel = mongoose.model(productCollection, productSchema);
