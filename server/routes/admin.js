import express from "express";
import { adminHomePage } from "../controllers/admin/admin.js";
import { verfyIsAdminLoggedIn } from "../middlewares/verifyAdmin.js";
import { getAllTrees } from "../controllers/tree.js";
import { getAllUsers } from "../controllers/user.js";
const router = express.Router();

router.get("/",  adminHomePage)
router.get("/allUsers", getAllUsers)
router.get("/allTrees", getAllTrees)

export default router;