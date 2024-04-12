import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    displayName: String,
    gmail: String,
    image: String,
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
