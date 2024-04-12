import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    username: String,
    gmail: String,
    image: String,
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
