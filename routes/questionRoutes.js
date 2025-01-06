import express from "express";
import {createQuestion, getQuestion, getQuestions, patchQuestionStatus} from "../controllers/questionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/create',authMiddleware, createQuestion);
router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.patch('/:id', authMiddleware, patchQuestionStatus);


export default router;