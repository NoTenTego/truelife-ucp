import express from "express";
import { getTopMoney, getTopActivity, getTopFactions, getTopBusinesses, getServerStats } from "../controllers/dashboard.js";
import { verifyCsrfToken } from "../middleware/verifyCsrfToken.js";

const router = express.Router()

router.get("/getTopMoney", verifyCsrfToken, getTopMoney)
router.get("/getTopActivity", verifyCsrfToken, getTopActivity)
router.get("/getTopFactions", verifyCsrfToken, getTopFactions)
router.get("/getTopBusinesses", verifyCsrfToken, getTopBusinesses)
router.get("/serverstats", verifyCsrfToken, getServerStats)

export default router;