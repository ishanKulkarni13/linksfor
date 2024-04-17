import dotenv from 'dotenv';
dotenv.config();

import User from "../models/user.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export function configPassport() {
    passport.serializeUser((user, cb) => {
        cb(null, user._id)
    });

    passport.deserializeUser(async (userID, cb) => {
        try {
            // console.log(`inside deserializeUsergot userID as: ${userID}`);
            let user = await User.findById(userID);
            // console.log(`inside deserializeUser got user as: ${user}`);
            cb(null, user)
        } catch (error) {
            cb(`error occured in deserializeUser`, null)
        }
    })
}

const GoogleStrategyConfig = {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
};

const GoogleStrategyVerifyFunction = async (accessToken, refreshToken, user, cb) => {
    try {
        let { provider, id, name, emails, photos } = user;
        name = name.givenName
        let email = emails[0].value;
        let googleProfilePhoto = photos[0].value;

        user = await User.findOne({ googleOAuthID: id });
        if (!user) {
            // Passing photo: remained...
            user = await User.create({ name, email, googleOAuthID: id, authMethod: 'google' })
        }
        return cb(null, user)
    } catch (error) {
        cb(error, null)
    }
}

passport.use(new GoogleStrategy(GoogleStrategyConfig, GoogleStrategyVerifyFunction));