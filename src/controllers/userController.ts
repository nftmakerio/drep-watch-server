import type { Request, Response } from "express";
import supabase from "../supabase/db";
import { UserModel } from "../models/User";

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
    if (!wallet_address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    if (email) {
      // Check if the user already exists in Supabase by email
      const existingUserByEmail = await supabase
        .from("users")
        .select("wallet_address")
        .eq("email", email)
        .single();

      // Handle cases where either email or wallet address is already in use
      if (existingUserByEmail.data) {
        return res
          .status(409)
          .json({ success: false, message: "Email already exists" });
      }
    }

    // Check if the user already exists in Supabase by wallet address
    const existingUserByWallet = await supabase
      .from("users")
      .select("*")
      .eq("wallet_address", wallet_address)
      .single();

    if (existingUserByWallet.data) {
      return res.status(200).json({
        success: false,
        message: "Wallet address already exists",
        data: existingUserByWallet.data,
      });
    }

    // Create a new user in Supabase
    const { error } = await supabase
      .from("users")
      .insert([{ email, name, wallet_address }])
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        wallet_address,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const wallet_address = req.params.wallet_address;
    if (!wallet_address)
      throw { status: 400, message: "no wallet address found in params" };
    const user = await UserModel.getUserByWalletAddress(wallet_address);
    if (!user) throw { status: 400, message: "User does not exist" };

    const delegatedTo = await UserModel.getUserDelegatedTo(wallet_address);

    const resBody = {
      name: user.name,
      email: user.email,
      pool_id: delegatedTo?.pool_id,
      active: delegatedTo?.active,
    };
    res.status(200).json(resBody);
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};
export { createUser, getUser };
