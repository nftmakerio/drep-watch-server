import { Router } from "express";
import { createQuestion, getQuestion, getQuestionByUser, getQuestionsByTheme } from "../controllers/questionController";

const router = Router();

router.post("/ask-question", createQuestion);
router.get("/:id", getQuestion);
router.get("/",getQuestionByUser);//pass the user_id to query
router.get("/", getQuestionsByTheme);//pass the theme in the query field

export default router;