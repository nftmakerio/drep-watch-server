import { Router } from "express";
import {
  createQuestion,
  getQuestion,
  getQuestionByUser,
  getQuestionsByTheme,
  getLatestQuestions,
} from "../controllers/questionController";

const router = Router();

router.get("/latest", getLatestQuestions);
router.post("/ask-question", createQuestion);
router.get("/:id", getQuestion);
<<<<<<< HEAD:server/src/routers/questionRoutes.ts
router.get("/user/:user_id",getQuestionByUser);//pass the user_id to query
=======
router.get("/", getQuestionByUser); //pass the user_id to query
>>>>>>> ba49e2a592ca21e36ad28faa27800863704d2dd2:src/routers/questionRoutes.ts
router.get("/theme/:theme", getQuestionsByTheme);

export default router;
