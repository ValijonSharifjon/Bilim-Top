import express from "express";
import {
    createAnswer, getAnswer,
    getAnswers,
    getPendingAnswer,
    getPendingAnswers,
    patchAnswerStatus
} from "../controllers/answerController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {patchQuestionStatus} from "../controllers/questionController.js";

const router = express.Router();

router.post("/create", authMiddleware, createAnswer);
router.get("/pending", authMiddleware, adminMiddleware, getPendingAnswers);
router.get("/pending/:id", authMiddleware, adminMiddleware, getPendingAnswer);
router.patch("/:id", authMiddleware, adminMiddleware, patchAnswerStatus);
router.get("/", getAnswers);
router.get("/:id", getAnswer);

export default router;