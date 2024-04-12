import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./model/UserSchema.js";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing User");
    done(null, user.id, user);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing User");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        const foundUser = await User.findOne({ googleId: profile.id });
        if (!foundUser) {
          const user = {
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails?.[0]?.value ?? "",
            // image: profile.photos?.[0]?.value ?? "",
          };
          const newUser = await User.create(user);
          await newUser.save();
          await done(null, newUser);
        } else {
          await done(null, foundUser);
        }
      }
    )
  );
};
