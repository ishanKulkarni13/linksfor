import dotenv from 'dotenv';
dotenv.config();

import User from "../models/user.js";
import Tree from "../models/tree.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export function configPassport() {
    passport.serializeUser((userID, cb) => {
        cb(null, userID)
    });
    passport.deserializeUser(async (userID, cb) => {
        cb(null, userID)
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
            user = await User.create({ name, email, googleOAuthID: id, authMethod: 'google' });
            let tree = await Tree.create({ owner: user._id, treeName: `${user.name}'s tree` });
            await User.findByIdAndUpdate(user._id, { $set: { 'trees.ProfileDefaultTree': tree._id } });
        }
        return cb(null, user._id)
    } catch (error) {
        cb(error, null)
    }
}

passport.use(new GoogleStrategy(GoogleStrategyConfig, GoogleStrategyVerifyFunction));