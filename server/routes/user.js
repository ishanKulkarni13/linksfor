import express from "express";
import { getAllUsers, userInfo } from "../controllers/user.js";
import { verifyIsUserLggedIn } from "../middlewares/verifyIsUserLggedIn.js";
const router = express.Router();

router.get("/userInfo", verifyIsUserLggedIn, userInfo)
router.get("/all", getAllUsers)

export default router;    