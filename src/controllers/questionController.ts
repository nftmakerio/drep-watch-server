import { type Request, type Response } from "express";
import { QuestionModel, Question } from "../models/Question";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const questionReq: Question = req.body;
    const newQuestion = new QuestionModel(questionReq);
    const saveStatus = await newQuestion.save();
    console.log(saveStatus);
    if (saveStatus !== true)
      throw { status: 400, message: "Could not save the question" };
    res.status(201).json({ saveStatus, newQuestion });
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};

export const getQuestion = async (req: Request, res: Response) => {
  try {
    const questionId: number = parseInt(req.params.id);
    console.log(questionId);
    const question = await QuestionModel.getQuestionById(questionId);
    if (!question) throw { status: 400, message: "Invalid questionId" };
    res.status(200).json({ question: question });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
export const getLatestQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await QuestionModel.getLatestQuestions();
    if (!questions)
      throw {
        status: 400,
        message: `Could not fetch latest questions`,
      };
    res.status(200).json({ questions: questions });
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};
export const getQuestionsByTheme = async (req: Request, res: Response) => {
  try {
    const reqTheme = req.params.theme;
    console.log(reqTheme);
    const questions = await QuestionModel.getQuestionByTheme(reqTheme);
    if (!questions)
      throw {
        status: 400,
        message: `Could not fetch questions for ${reqTheme}`,
      };
    res.status(200).json({ questions: questions });
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};
export const getQuestionByUser = async (
  req: Request<
    {},
    {},
    {
      query: {
        wallet_address: string;
        drep_id: string;
      };
    }
  >,
  res: Response
) => {
  try {
    const wallet_address = req.query.wallet_address;
    const drep_id = req.query.drep_id;
    if (!wallet_address && !drep_id)
      throw { status: 400, message: "No query provided" };

    const questions = wallet_address
      ? await QuestionModel.getQuestionsByUserId(wallet_address as string)
      : drep_id
        ? await QuestionModel.getQuestionsForDrepId(drep_id as string)
        : undefined;

    if (questions === undefined)
      throw { status: 400, message: "Could not fetch questions" };
    res.status(200).json(questions);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
