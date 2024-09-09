import type { Request, Response } from "express";
import supabase from "../supabase/db";
import DrepModel from "../models/Drep";
import { QuestionModel } from "../models/Question";
import { AnswerModel } from "../models/Answer";

interface DrepRequestBody {
  email: string;
  name: string;
  wallet_address: string;
}

const createDrep = async (
  req: Request<{}, {}, DrepRequestBody>,
  res: Response
) => {
  try {
    const { email, name, wallet_address } = req.body;

    // Validate input
    if (!email || !name || !wallet_address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if the pool_id is already in use
    const existingAdminByPoolId = await supabase
      .from("users")
      .select("wallet_address")
      .eq("wallet_address", wallet_address)
      .single();

    if (existingAdminByPoolId.data) {
      return res.status(409).json({
        success: false,
        message: "Admin with this drep_id already exists",
      });
    }

    // Create a new admin in Supabase
    const { error } = await supabase
      .from("dreps")
      .insert([{ email, name, wallet_address }])
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
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

    if (!drep_id) throw { status: 400, message: "Request body not correct" };

    const drepQuestions = await QuestionModel.getDrepQuestions(drep_id);

    if (drepQuestions === undefined)
      throw { status: 400, message: "Could not fetch questions" };
    const drepAnswers = await AnswerModel.getDrepAnswers(drep_id);

    if (drepAnswers === undefined)
      throw { status: 400, message: "Could not fetch answers" };

    const drepMetadata = await DrepModel.getDrep(drep_id);

    if (drepMetadata === undefined)
      throw { status: 400, message: "Could not fetch drep" };

    const resBody = {
      questionsAsked: drepQuestions,
      questionsAnswers: drepAnswers,
      image: drepMetadata.json_metadata?.body?.image?.contentUrl,
      name: drepMetadata.json_metadata?.body?.givenName["@value"],
    }; // response Body
    res.status(200).json(resBody);
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};
const getDrepSearch = async (req: Request, res: Response) => {
  try {
    const search_query = req.query.search_query as string;
    if (!search_query) {
      throw { status: 404, message: "No Query Provided" };
    }
    if (search_query === "") {
      res.status(200).json([]);
    }
    const dreps = await DrepModel.getDrepByQuery(search_query);
    console.log(dreps);
    if (!dreps) {
      throw { status: 404, message: "No dreps found" };
    }
    res.status(200).json(dreps);
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};
const getDreps = async (req: Request, res: Response) => {
  try {
    let page = 1;
    if (!!parseInt(req.query.page as string)) {
      page = parseInt(req.query.page as string);
    }
    const dreps = await DrepModel.getDreps(page);
    console.log(dreps);
    if (!dreps) {
      throw { status: 404, message: "No dreps found" };
    }
    res
      .status(200)
      .json({ dreps, nextPage: dreps.length < 100 ? null : page + 1 });
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};

const getDrepProposals = async (req: Request, res: Response) => {
  try {
    const drep_id = req.params.drep_id as string;

    if (!drep_id) throw { status: 400, message: "No Drep ID found" };

    const dreps = await DrepModel.getDrepProposals(drep_id)

    if (!dreps) {
      throw { status: 404, message: "No dreps found" };
    }

    res.status(200).json(dreps);
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};
export {
  createDrep,
  getDrepProfile,
  getDrepSearch,
  getDreps,
  getDrepProposals,
};
