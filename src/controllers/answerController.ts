import type { Request, Response } from "express";
import { Answer, AnswerModel } from "../models/Answer";

export const postAnswer = async (req: Request, res: Response) => {
    try {
        const answerBody: Answer = req.body;
        const answer = new AnswerModel(answerBody);
        const saveStatus = await answer.save();
        if (saveStatus !== true)
            throw { status: 400, message: "Failed to save the answer" };
        res.status(201).json(answer);
    } catch (err: any) {
        res.status(err.status).json({ message: err.message });
    }
}
export const getAnswer = async (req: Request, res: Response) => {
    try {
        const questionId = parseInt(req.params.q_id);
        const answer = await AnswerModel.getAnswerByQuestionId(questionId);
        if (!answer)
            throw { status: 400, message: "failed to get answer" };
        res.status(200).json(answer);
    } catch (err: any) {
        res.status(err.status).json({ message: err.message });
    }
}
export const getAnswers = async (req: Request, res: Response) => {
    try {
        // console.log(req.params);
        const isLatest = (req.query.latest as string) === "true";
        if (!isLatest) {
            throw {
                status: 400,
                message: `latest param not true`,
            };
        }
        const answers = await AnswerModel.getLatestDrepAnswers();
        if (!answers)
            throw {
                status: 400,
                message: `Could not fetch latest questions`,
            };
        res.status(200).json({ answers });
    } catch (err: any) {
        res.status(err.status).json({ message: err.message });
    }
}