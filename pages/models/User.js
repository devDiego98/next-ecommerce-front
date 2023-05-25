import { model, Schema, models } from "mongoose";
const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;
