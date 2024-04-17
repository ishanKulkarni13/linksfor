import express from "express";
const router = express.Router();
import { handelPassportGoogleLoginCallback, logout, handelLogin } from "../controllers/auth.js";
import passport from "passport";

const callbackConfig = { session: true, failureRedirect: "/login", }
const googleLoginConfig = { scope: ["profile", "email"] }

router.get("/login", handelLogin);
router.get("/google", passport.authenticate("google", googleLoginConfig));
router.get("/google/callback", passport.authenticate("google", callbackConfig), handelPassportGoogleLoginCallback)
router.get('/logout', logout);

export default router;    