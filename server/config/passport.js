import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import pool from "./db.js";
import dotenv from "dotenv";
dotenv.config();

// Google Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await pool.query("SELECT * FROM users WHERE google_id = $1", [profile.id]);
        if (result.rows.length > 0) {
          return done(null, result.rows[0]);
        } else {
          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
          if (!email) {
            console.warn("Google profile does not contain an email.");
          }
          const newUserResult = await pool.query(
            "INSERT INTO users (username, email, google_id) VALUES ($1, $2, $3) RETURNING *",
            [profile.displayName, email, profile.id]
          );
          return done(null, newUserResult.rows[0]);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Facebook Auth
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await pool.query("SELECT * FROM users WHERE facebook_id = $1", [profile.id]);
        if (result.rows.length > 0) {
          return done(null, result.rows[0]);
        } else {
          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
          if (!email) {
            console.warn("Facebook profile does not contain email.")
          }
          const newUserResult = await pool.query(
            "INSERT INTO users (username, email, facebook_id) VALUES ($1, $2, $3) RETURNING *",
            [profile.displayName, email, profile.id]
          );
          return done(null, newUserResult.rows[0]);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;



