import { Router } from "express";
import { createQuestion, getQuestion, getQuestionsByTheme } from "../controllers/questionController";

const router = Router();

router.post("/ask-question", createQuestion);
router.get("/:id", getQuestion);

// router.get("/:theme", getQuestionsByTheme);

export default router;