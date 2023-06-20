import mongoose, { model, Schema, models } from "mongoose";
const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  favorites: { type: Array },
});

const User = models.User || model("User", UserSchema);

export default User;
