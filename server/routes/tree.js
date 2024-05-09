import express from "express";
import { HandelCreateTreeGet,createTree, editTree, getAllTrees, getUserTrees, addLink, deleteLink, getAdminAllTreeLinks, updateLinksOrder , editTreeLinkTitleAndURL} from "../controllers/tree.js";
import { verifyIsUserLggedIn } from "../middlewares/verifyIsUserLggedIn.js";
import { Multerupload } from "../middlewares/multer.js";

const router = express.Router();


router.get("/userTrees",verifyIsUserLggedIn, getUserTrees)

// for tree Owner
router.get("/create",HandelCreateTreeGet); 
router.post("/create", Multerupload.single("treePicture"), createTree);
router.get("/adminAllTreeLinks/:treeUID",verifyIsUserLggedIn, getAdminAllTreeLinks)  
router.post("/edit", Multerupload.single("treePicture"), editTree);
router.post("/edit/addLink/:linkUID", verifyIsUserLggedIn, addLink);
router.post("/edit/deleteLink/:linkUID", verifyIsUserLggedIn, deleteLink);
router.post("/edit/editLinksOrder/:treeUID",verifyIsUserLggedIn, updateLinksOrder) 
router.post("/edit/editTitleAndURL/:treeUID",verifyIsUserLggedIn, editTreeLinkTitleAndURL) 
router.get("/userTrees",verifyIsUserLggedIn, getUserTrees) //temp


export default router;