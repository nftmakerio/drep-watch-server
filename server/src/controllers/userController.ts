import type { Request, Response } from "express";
import supabase from "../supabase/db";

interface UserRequestBody {
    email: string;
    name: string;
    wallet_address: string;
}

const createUser = async (
    req: Request<{}, {}, UserRequestBody>,
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

        // Check if the user already exists in Supabase
        const existingUser = await supabase
            .from("dreps-users")
            .select("id")
            .eq("email", email)
            .single();

        if (existingUser.data) {
            return res
                .status(409)
                .json({ success: false, message: "User already exists" });
        }

        // Create a new user in Supabase
        const { error } = await supabase
            .from("dreps-users")
            .upsert([{ email, name, wallet_address }]);

        if (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }

        return res
            .status(201)
            .json({ success: true, message: "User created successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export { createUser };
