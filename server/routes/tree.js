import express from "express";
import { HandelCreateTreeGet,createTree, editTree, getAllTrees, getUserTrees } from "../controllers/tree.js";
import { verifyIsUserLggedIn } from "../middlewares/verifyIsUserLggedIn.js";
import { Multerupload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/create",HandelCreateTreeGet); //temp
router.post("/create", Multerupload.single("treePicture"), createTree);
router.post("/edit", Multerupload.single("treePicture"), editTree);
router.get("/userTrees",verifyIsUserLggedIn, getUserTrees)


export default router;