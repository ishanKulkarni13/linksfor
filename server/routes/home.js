import express from "express";
import { homeHandelar } from "../controllers/home.js";
import {verifyIsUserLggedIn} from "../middlewares/verifyIsUserLggedIn.js";

const router = express.Router();
router.get("/" ,verifyIsUserLggedIn,homeHandelar )

export default router