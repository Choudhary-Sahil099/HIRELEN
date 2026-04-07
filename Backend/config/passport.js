import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
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
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }
        user = await User.findOne({ email });

        if (user) {
          user.googleId = profile.id;
          user.authProvider = "google";
          user.isVerified = true;

          await user.save();
          return done(null, user);
        }
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: email,
          avatar: profile.photos?.[0]?.value,
          authProvider: "google",  
          isVerified: true,      
        });

        return done(null, user);

      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;