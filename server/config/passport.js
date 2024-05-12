import dotenv from 'dotenv';
import User from "../models/user.js";
import Tree from "../models/tree.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import LocalStrategy from "passport-local"
import ErrorHandler from '../utils/error.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
dotenv.config();

// serializeUser and deserializeUser
export function configPassport() {
    passport.serializeUser((req, user, cb) => {
        try {
            console.log("inside serilie");
            cb(null, user._id);
        } catch (error) {
            cb(`Error occured while serializing`, false)
            req.res.clearCookie('connect.sid');
        }
    });
    passport.deserializeUser(async (req, userID, cb) => {
        console.log("inside deserilize");
        try {
            let user = await User.findById(userID);
            if (user) {
                return cb(null, user)
            }
            console.log(`Error occured while deserializing: User not found, loggin out...`);
            req.logout(() => {
                cb("Error occurred while deserializing user", false);
            });
            console.log("end of deserializeUser");
        } catch (error) {
            console.log("erroe in catch in deserializeUser, loggin out...", error);
            req.logout(() => {
                cb("Error occurred while deserializing user", false);
            });;
        }
    })
}


// Google Strategy
const GoogleStrategyConfig = {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
};
const googleStrategyVerifyFunction = async (accessToken, refreshToken, user, cb) => {
    try {
        let { provider, id, name, emails, photos } = user;
        name = name.givenName
        let email = emails[0].value;
        let googleProfilePhoto = photos[0].value;

        user = await User.findOne({ googleOAuthID: id });
        if (!user) {
            let { public_id, url } = await uploadToCloudinary(googleProfilePhoto);
            let profilePic;
            if (public_id && url) {
                profilePic = { public_id, URL: url }
            }
            user = await User.create({ name, email, profilePic, googleOAuthID: id, authMethod: 'google' });
            let tree = await Tree.create({ owner: user._id, treeName: `@${user.name}` , treePicture:{URL:user.profilePic.URL}});
            await User.findByIdAndUpdate(user._id, { $set: { 'trees.profileDefaultTree': tree._id } });
        }
        return cb(null, user)
    } catch (error) {
        cb(error, false)
    }
}
passport.use(new GoogleStrategy(GoogleStrategyConfig, googleStrategyVerifyFunction));


// local strategy
const LocalStrategyVerifyFunction = async (email, password, cb) => {
    console.log(email, password);
    if (!email) {
        return cb(new ErrorHandler("email is not provided"), false)
    } else if (!password){
        return cb(new ErrorHandler("Password is not provided"), false)
    }
    try {

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return cb(new ErrorHandler("email is invalid"), false)
        }

        let isPasswordValid = await user.isValidPassword(password, user);
        if (isPasswordValid) {
            return cb(null, user);
        } else {
            return cb(new ErrorHandler("Password is invalid"), false)
        }

    } catch (error) {
        console.log('error in LocalStrategyVerifyFunction', error);
        cb(error, false)
    }

}
passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, LocalStrategyVerifyFunction))