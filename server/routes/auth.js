import express from "express";
import { handelPassportGoogleLoginCallback, logout, handelLogin, handelRegester, localLoginPage, handelPassportlocalRegester, localRegesterPage } from "../controllers/auth.js";
import passport from "passport";
import { Multerupload } from "../middlewares/multer.js";
import { localPassportLoginauthentication } from "../controllers/passport.js";

const dummymid = (req, res, next) => {
    console.log("in dummymid");
    res.send("hi from dummymid!");

    next()
}

const router = express.Router();
const callbackConfig = { session: true, failureRedirect: "/regester", }
const googleLoginConfig = { scope: ["profile", "email"] }

router.get("/regester", handelRegester);
router.get("/login", handelLogin);
// for google auth
router.get("/google", passport.authenticate("google", googleLoginConfig));
router.get("/google/callback", passport.authenticate("google", callbackConfig), handelPassportGoogleLoginCallback)
// for local auth
router.get("/local/regester", localRegesterPage); // temp
router.post("/local/regester", Multerupload.single("profPhoto"), handelPassportlocalRegester);

router.get("/local/login", localLoginPage); // temp { failureRedirect: "/auth/local/login", successRedirect: 'http://localhost:3000/me' }
router.post("/local/login", passport.authenticate("local"), localPassportLoginauthentication);

router.get('/logout', logout);

export default router;