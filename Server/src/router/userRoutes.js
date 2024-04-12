import express from "express";
import passport from "passport";

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
    res.redirect(CLIENT_URL); // Redirect to homepage after logout
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

export default router;
