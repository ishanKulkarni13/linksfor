import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import User from "./models/user.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import homeRouter from "./routes/home.js";
import treeRouter from "./routes/tree.js"
// for passportjs
import cookieSession from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from 'path';
import { createTree } from './controllers/tree.js';
import { errorMiddleware } from './middlewares/error.js';
// import { GoogleStrategyConfig, GoogleStrategyVerifyFunction } from './config/passport.js';
// passport.use(new GoogleStrategy(GoogleStrategyConfig, GoogleStrategyVerifyFunction ));

const app = express();
app.use(cookieSession({
    secret: process.env.SESSION_SESSION_SECREAT,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// usings routs
app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/tree", treeRouter);
app.use(errorMiddleware)
app.set('view engine', 'ejs');
export default app;