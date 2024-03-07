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
}

export const getQuestion = async (req: Request, res: Response) => {
    try {
        const questionId: number = parseInt(req.params.id);
        const question = await QuestionModel.getQuestionById(questionId);
        if (!question)
            throw { status: 400, message: "Invalid questionId" };
        res.status(200).json({ question: question });

    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message });
    }
}
export const getQuestionsByTheme = async (req: Request, res: Response) => {
    try {
        const theme = req.params.theme;
        const questions = await QuestionModel.getQuestionByTheme(theme);
        if (!questions)
            throw { status: 400, message: `Could not fetch questions for ${theme}` };
        res.status(200).json({ questions: questions });

    } catch (err: any) {
        res.status(err.status).json({ message: err.message });
    }
}