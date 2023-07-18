import express from "express";
import { getLogs } from "../controllers/getLogs.js";
import { verifyCsrfToken } from "../middleware/verifyCsrfToken.js";

const router = express.Router()

router.post("/getLogs", verifyCsrfToken, getLogs)

export default router