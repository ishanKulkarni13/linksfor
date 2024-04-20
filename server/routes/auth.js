import express from "express";
import { handelPassportGoogleLoginCallback, logout, handelLogin, handelRegester, localLoginPage, handelPassportlocalRegester, localRegesterPage } from "../controllers/auth.js";
import passport from "passport";

const dummymid = (req,res,next)=>{
    res.send("hi from dummymid!")
    next()
}

const router = express.Router();
const callbackConfig = { session: true, failureRedirect: "/regester",}
const googleLoginConfig = { scope: ["profile", "email"] }

router.get("/regester", handelRegester);
router.get("/login", handelLogin);
// for google auth
router.get("/google", passport.authenticate("google", googleLoginConfig));
router.get("/google/callback", passport.authenticate("google", callbackConfig), handelPassportGoogleLoginCallback)
// for local auth
router.get("/local/regester", localRegesterPage);
router.post("/local/regester", handelPassportlocalRegester);

router.get("/local/login", localLoginPage);
router.post("/local/login", passport.authenticate("local", {failureRedirect:"/regester", successRedirect:"/"}) , dummymid);

router.get('/logout', logout);

export default router;