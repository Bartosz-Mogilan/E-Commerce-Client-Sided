import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "./db.js";
import dotenv from "dotenv";
dotenv.config();

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
          // Create new user with Google credentials
          const newUserResult = await pool.query(
            "INSERT INTO users (username, email, google_id) VALUES ($1, $2, $3) RETURNING *",
            [profile.displayName, profile.emails[0].value, profile.id]
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

