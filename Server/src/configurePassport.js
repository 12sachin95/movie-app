import passport from "passport";
// import bcrypt from "bcryptjs";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { GraphQLLocalStrategy } from "graphql-passport";
import User from "./model/UserSchema.js";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing User");
    done(null, user.id);
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
  //   passport.use(
  //     new GraphQLLocalStrategy(async (username, password, done) => {
  //       try {
  //         // Adjust this callback to your needs
  //         const user = await User.findOne({ username });
  //         if (!user) {
  //           throw new Error("Invalid username or password");
  //         }
  //         const validPassword = await bcrypt.compare(password, user.password);
  //         if (!validPassword) {
  //           throw new Error("Invalid username or password");
  //         }

  //         return done(null, user);
  //       } catch (error) {
  //         return done(error);
  //       }
  //     })
  //   );
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log("===<>>>>profile", profile);
        const newUser = await User.create(
          {
            googleId: profile.id,
            displayName: profile.displayName,
            gmail: profile.emails?.[0]?.value ?? "",
            image: profile.photos?.[0]?.value ?? "",
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          }
          // function (err, user) {
          //   return cb(err, user);
          // }
        );

        console.log("===newUser", newUser);
        await newUser.save();

        await done(null, newUser);
      }
    )
  );
};
