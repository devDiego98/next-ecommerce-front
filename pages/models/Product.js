import mongoose, { model, Schema, models } from "mongoose";
const ProductSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String },
  price: { type: Number, required: true },
  stripe_price_id: { type: String, required: true },
  images: { type: Array, required: true },
  category: { type: [String] },
  properties: { type: Object },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
