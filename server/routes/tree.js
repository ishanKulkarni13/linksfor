import express from "express";
import { HandelCreateTreeGet,createTree, getAllTrees, getUserTrees } from "../controllers/tree.js";
import { verfyIsAdminLoggedIn } from "../middlewares/verifyAdmin.js";
import { verifyIsUserLggedIn } from "../middlewares/verifyIsUserLggedIn.js";

const router = express.Router();

router.get("/create",HandelCreateTreeGet);
router.post("/create",createTree);
router.get("/userTrees",verifyIsUserLggedIn, getUserTrees)


export default router;