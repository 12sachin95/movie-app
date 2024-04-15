import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../model/UserSchema.js";

const router = express.Router();

const CLIENT_URL = "http://localhost:3000/";

router.get("/authUser", (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/login/success", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "successfull",
    user: req.user,
    //   cookies: req.cookies
  });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    // Pass a callback function
    if (err) {
      return res.status(500).send("Logout failed");
    } // Handle errors (optional)
    res.status(200).send("Logout successfull"); //redirect to homepage after logout
  });
  // res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  })
);

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/signin", passport.authenticate("local"), function (req, res) {
  res.status(200).json({ message: "login successfull", data: req.user });
});

export default router;
