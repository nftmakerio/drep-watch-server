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

export { createDrep };
