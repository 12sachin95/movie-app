import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
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

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Adjust this callback to your needs
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, {
            message: "wrong email or password",
          });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return done(null, false, {
            message: "wrong email or password",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
