import express from "express";
import { getMyTopics, createNewReport, getTopicData, createNewComment, getAllReports, changeTopicStatus, deleteTopic } from "../controllers/helpdesk.js";
import { verifyCsrfToken } from "../middleware/verifyCsrfToken.js";

const router = express.Router()

router.post("/getMyTopics", verifyCsrfToken, getMyTopics)
router.post("/createNewReport", verifyCsrfToken, createNewReport)
router.post("/getTopicData", verifyCsrfToken, getTopicData)
router.post("/createNewComment", verifyCsrfToken, createNewComment)
router.post("/getAllReports", verifyCsrfToken, getAllReports)
router.post("/changeTopicStatus", verifyCsrfToken, changeTopicStatus)
router.post("/deleteTopic", verifyCsrfToken, deleteTopic)

export default router