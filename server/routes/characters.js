import express from "express";
import { getCharacters, getVehicles } from "../controllers/character.js";
import { verifyCsrfToken } from "../middleware/verifyCsrfToken.js";

const router = express.Router();

router.get("/", verifyCsrfToken, getCharacters);
router.get("/getVehicles", verifyCsrfToken, getVehicles);

export default router;