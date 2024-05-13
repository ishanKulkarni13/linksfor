import express from "express";
import { HandelCreateTreeGet,createTree, editTree, getUserTrees, addLink, deleteLink, getAdminAllTreeLinks, updateLinksOrder , editTreeLinkTitleAndURL, getUserDefaultTreeUID,changeTreePicture, treeProfile, editTreeProfile} from "../controllers/tree.js";
import { verifyIsUserLggedIn } from "../middlewares/verifyIsUserLggedIn.js";
import { Multerupload } from "../middlewares/multer.js";

const router = express.Router();


router.get("/userTrees", getUserTrees)
router.get("/user-default-treeUID", getUserDefaultTreeUID) 
 

// for tree Owner   editTreeProfile
router.get("/create",HandelCreateTreeGet); 
router.post("/create", Multerupload.single("treePicture"), createTree);
router.get("/adminAllTreeLinks/:treeUID", getAdminAllTreeLinks)  
router.get("/tree-profile/:treeUID", treeProfile)  
router.post("/edit", Multerupload.single("treePicture"), editTree);
router.post("/edit/addLink/:linkUID",  addLink);
router.post("/edit/deleteLink/:linkUID", deleteLink);
router.post("/edit/editLinksOrder/:treeUID", updateLinksOrder) 
router.post("/edit/editTitleAndURL/:treeUID", editTreeLinkTitleAndURL);
router.post("/change-tree-picture", Multerupload.single("treePicture"), changeTreePicture);
router.post("/change-tree-picture/:treeUID", Multerupload.single("treePicture"), changeTreePicture);
router.post("/edit-tree-profile/:treeUID", editTreeProfile);
router.get("/userTrees", getUserTrees) //temp


export default router;