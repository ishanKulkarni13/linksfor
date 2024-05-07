import express from "express";
import { HandelCreateTreeGet,createTree, editTree, getAllTrees, getUserTrees, addLink, deleteLink, getAdminAllTreeLinks } from "../controllers/tree.js";
import { verifyIsUserLggedIn } from "../middlewares/verifyIsUserLggedIn.js";
import { Multerupload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/create",HandelCreateTreeGet); //temp
router.post("/create", Multerupload.single("treePicture"), createTree);
router.get("/userTrees",verifyIsUserLggedIn, getUserTrees) // for non tree Owner
router.get("/adminAllTreeLinks/:treeUID",verifyIsUserLggedIn, getAdminAllTreeLinks) // for tree Owner
// edit tree routh getAdminAllTreeLinks
router.post("/edit", Multerupload.single("treePicture"), editTree);
router.post("/edit/addLink/:linkUID", addLink);
router.post("/edit/deleteLink/:linkUID", deleteLink);
router.get("/userTrees",verifyIsUserLggedIn, getUserTrees)


export default router;