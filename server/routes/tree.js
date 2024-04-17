import express from "express";
import { createTree } from "../controllers/tree.js";

const router = express.Router();

router.get("/create", createTree)

export default router;