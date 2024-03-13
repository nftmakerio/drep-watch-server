import { Router } from "express";
import {
    createQuestion,
    getQuestion,
    getQuestionsByTheme,
    getLatestQuestions,
} from "../controllers/questionController";

const router = Router();

router.get("/", getLatestQuestions);
router.post("/ask-question", createQuestion);
router.get("/:id", getQuestion);
router.get("/theme/:theme", getQuestionsByTheme);

export default router;
