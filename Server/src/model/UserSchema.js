import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    username: String,
    email: String,
    // image: String,
    password: String,
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
