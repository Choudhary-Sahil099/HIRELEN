import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import {
  findUserById,
  findOrCreateGoogleUser,
  findUserByEmail
} from "../models/User.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const user = await findOrCreateGoogleUser({
          name: profile.displayName,
          email,
          googleId: profile.id,
          avatar: profile.photos?.[0]?.value,
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;