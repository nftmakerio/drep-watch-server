import type { Request, Response } from "express";
import supabase from "../supabase/db";

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

        // Check if the user already exists in Supabase
        const existingUser = await supabase
            .from("dreps-admins")
            .select("drep_id")
            .eq("email", email)
            .single();

        if (existingUser.data) {
            return res
                .status(409)
                .json({ success: false, message: "Admin already exists" });
        }

        // Create a new user in Supabase
        const { error } = await supabase
            .from("dreps-admins")
            .upsert([{ email, name, drep_id: pool_id }]);

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
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export { createDrep };
