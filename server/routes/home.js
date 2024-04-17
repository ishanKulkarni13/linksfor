import express from "express";
import { homeHandelar } from "../controllers/home.js";
import verifyUserLggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();
router.get("/" ,verifyUserLggedIn,homeHandelar )

export default router