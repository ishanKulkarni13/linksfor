import express from "express";
import { searchTreeByTreeUID, searchTreeByUserUID, searchTreeByUsername, searchUserByUserUID, searchUserByUsername } from "../controllers/search.js";

const router = express.Router();
//search user
router.get("/user/username", searchUserByUsername);
router.get("/user/username/:username", searchUserByUsername);
router.get("/user/useruid", searchUserByUserUID)

// search tree
router.get("/tree/treeuid", searchTreeByTreeUID)
router.get("/tree/username/:username", searchTreeByUsername);
router.get("/tree/useruid", searchTreeByUserUID);

export default router;