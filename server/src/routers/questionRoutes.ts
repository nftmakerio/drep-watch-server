import { Router } from "express";
import {
    createQuestion,
    getQuestion,
    getQuestionByUser, getQuestionsByTheme,
    getLatestQuestions,
} from "../controllers/questionController";

const router = Router();

router.get("/", getLatestQuestions);
router.post("/ask-question", createQuestion);
router.get("/:id", getQuestion);
router.get("/",getQuestionByUser);//pass the user_id to query
router.get("/theme/:theme", getQuestionsByTheme);

export default router;
