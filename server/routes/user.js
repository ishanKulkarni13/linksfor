import express from "express";
import { userInfo } from "../controllers/user.js";
import { verifyIsUserLggedIn } from "../middlewares/verifyIsUserLggedIn.js";
const router = express.Router();

router.get("/userInfo", verifyIsUserLggedIn, userInfo)

export default router;    