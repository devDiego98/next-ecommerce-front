import mongoose, { model, Schema, models, Mongoose } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parentCategory: { type: [mongoose.Types.ObjectId] },
  properties: { type: [{ type: Object }] },
});

const Category = models.Category || model("Category", CategorySchema);
export default Category;
