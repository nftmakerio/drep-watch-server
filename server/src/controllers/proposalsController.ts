import type { Request, Response } from "express";
import supabase from "../supabase/db";

interface CreateProposalRequestBody {
    title: string;
    description: string;
}

const createProposal = async (
    req: Request<{}, {}, CreateProposalRequestBody>,
    res: Response
) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }

        // Create a new proposal in Supabase
        const { data: createdProposal, error } = await supabase
            .from("dreps-proposals")
            .insert([{ title, description }])
            .select();

        if (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }

        return res.status(201).json({
            success: true,
            message: "Proposal created successfully",
            proposal: createdProposal,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

interface VoteRequestBody {
    proposal_id: string;
    drep_id: string;
    agree: boolean;
}

const voteOnProposal = async (
    req: Request<{}, {}, VoteRequestBody>,
    res: Response
) => {
    try {
        const { proposal_id, drep_id, agree } = req.body;

        // Validate input
        if (!proposal_id || !drep_id || agree === undefined) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }

        // Find the proposal with the given proposal_id
        const { data: existingProposal } = await supabase
            .from("dreps-proposals")
            .select("agreed, disagreed")
            .eq("id", proposal_id)
            .single();

        if (!existingProposal) {
            return res
                .status(404)
                .json({ success: false, message: "Proposal not found" });
        }

        // Check if the user has already voted in the same direction
        if (agree === true && existingProposal.agreed.includes(drep_id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "You already agreed with the proposal",
                });
        } else if (
            agree === false &&
            existingProposal.disagreed.includes(drep_id)
        ) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "You already disagreed with the proposal",
                });
        }

        // Update the agreed or disagreed array based on the 'agree' parameter
        const updatedData = {
            agreed:
                agree === true
                    ? [...existingProposal.agreed, drep_id]
                    : existingProposal.agreed.filter((id: string) => id !== drep_id),
            disagreed:
                agree === true
                    ? existingProposal.disagreed.filter((id: string) => id !== drep_id)
                    : [...existingProposal.disagreed, drep_id],
        };

        // Update the proposal in Supabase with the new data
        const { error: updateError } = await supabase
            .from("dreps-proposals")
            .update(updatedData)
            .eq("id", proposal_id);

        if (updateError) {
            console.error(updateError);
            return res
                .status(500)
                .json({ success: false, message: updateError.message });
        }

        return res.status(200).json({
            success: true,
            message: "Vote recorded successfully",
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export { createProposal, voteOnProposal };
