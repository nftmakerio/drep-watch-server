import type { Request, Response } from "express";
import supabase from "../supabase/db";
import DrepModel from "../models/Drep";
import { QuestionModel } from "../models/Question";
import { AnswerModel } from "../models/Answer";

interface DrepRequestBody {
    email: string;
    name: string;
    pool_id: string;
}

const createDrep = async (
    req: Request<{}, {}, DrepRequestBody>,
    res: Response
) => {
    try {
        const { email, name, pool_id } = req.body;

        // Validate input
        if (!email || !name || !pool_id) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }

        // Check if the admin already exists in Supabase
        const existingAdminByEmail = await supabase
            .from("dreps-admins")
            .select("drep_id")
            .eq("email", email)
            .single();

        // Check if the pool_id is already in use
        const existingAdminByPoolId = await supabase
            .from("dreps-admins")
            .select("email")
            .eq("drep_id", pool_id)
            .single();

        // Handle cases where either email or pool_id is already in use
        if (existingAdminByEmail.data) {
            return res
                .status(409)
                .json({
                    success: false,
                    message: "Admin with this email already exists",
                });
        }

        if (existingAdminByPoolId.data) {
            return res
                .status(409)
                .json({
                    success: false,
                    message: "Admin with this pool_id already exists",
                });
        }

        // Create a new admin in Supabase
        const { error } = await supabase
            .from("dreps-admins")
            .insert([{ email, name, drep_id: pool_id }])
            .select();

        if (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }

        return res
            .status(201)
            .json({ success: true, message: "Admin created successfully" });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

//Get a drep profile 
const getDrepProfile = async (req: Request, res: Response) => {
    try {
        const { drep_id } = req.body;
        if (!drep_id)
            throw { status: 400, message: "Request body not correct" };
        const drep = await DrepModel.getDrep(drep_id);
        if (!drep)
            throw { status: 400, message: "Drep does not exist" };
        const drepQuestions = await QuestionModel.getDrepQuestions(drep_id);
        if (!drepQuestions)
            throw { status: 400, message: "Could not fetch questions" };
        const drepAnswers = await AnswerModel.getDrepAnswers(drep_id);
        if (!drepAnswers)
            throw { status: 400, message: "Could not fetch answers" };
        const resBody = {
            name: drep.name,
            email: drep.email,
            questionsAsked: drepQuestions,
            questionsAnswers: drepAnswers
        }; // response Body 
        res.status(200).json(resBody);
    } catch (err: any) {
        res.status(err.status).json({ message: err.message });
    }
}
const getDrepSearch = async (req: Request, res: Response) => {
    try {
        const search_query = req.query.search_query as string;
        const dreps = await DrepModel.getDrepByQuery(search_query);
        console.log(dreps);
        
        if (!dreps) {
            throw { status: 404, message: "No dreps found" };
        }
        res.status(200).json(dreps);
    } catch (err: any) {
        res.status(err.status).json({ message: err.message });
    }
}
export { createDrep, getDrepProfile,getDrepSearch };
