import express from "express";
import { getPlayers, updatePlayerValue } from "../controllers/players.js";
import { verifyCsrfToken } from "../middleware/verifyCsrfToken.js";

const router = express.Router()

router.post("/getPlayers", verifyCsrfToken, getPlayers)
router.post("/updatePlayerValue", verifyCsrfToken, updatePlayerValue)

export default router