const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

    try{
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_CALLBACK_URL) {
    console.error('Missing Google API credentials in .env file');
    process.exit(1);
}

passport.use(
    new googleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {

            try {
                let existingUser = await User.findOne({googleId: profile.id});
                if(existingUser) {
                    return done(null, existingUser);
                }
                const newUser = new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                });

                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                console.error('Google login error:', error);
                return done(error, null);
            }
        }
    )
)

module.exports = passport;