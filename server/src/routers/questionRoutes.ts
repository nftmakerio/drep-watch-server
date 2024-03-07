import { Router } from "express";
import { createQuestion, getQuestion, getQuestionsByTheme } from "../controllers/questionController";

const router = Router();

router.post("/ask-question", createQuestion);
router.get("/:id", getQuestion);
router.get("/", getQuestionsByTheme);//pass the theme in the query field

export default router;