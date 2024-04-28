import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import express from "express";
import cookieSession from "express-session";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import homeRouter from "./routes/home.js";
import treeRouter from "./routes/tree.js"
import adminRouter from "./routes/admin.js"
import searchRouter from "./routes/search.js"
import passport from "passport";
import { errorMiddleware } from './middlewares/error.js';
import { cookieSessionConfig } from './config/cookieSession.js';
import { verfyIsAdminLoggedIn } from './middlewares/verifyAdmin.js';
import { verifyIsUserLggedIn } from './middlewares/verifyIsUserLggedIn.js';
import { searchUserByUsername } from './controllers/search.js';

dotenv.config();
const app = express();

app.use(cookieSession(cookieSessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// usings routs
app.use("/search", searchRouter);
app.use("/home", homeRouter);
app.use("/auth", authRouter);
app.use("/user", verifyIsUserLggedIn, userRouter);
app.use("/tree", verifyIsUserLggedIn, treeRouter);
app.use("/admin", verfyIsAdminLoggedIn, adminRouter);
app.use(errorMiddleware)
app.set('view engine', 'ejs');

export default app;

//test