import axios from "axios";
import { blockfrost } from "../blockfrost";
import supabase from "../supabase/db";

interface User {
  email: string;
  name: string;
  wallet_address: string;
  is_admin: boolean;
}
class UserModel {
  email: string;
  name: string;
  wallet_address: string;
  constructor({ email, name, wallet_address }: User) {
    this.email = email;
    this.name = name;
    this.wallet_address = wallet_address;
  }
  static async getUserByWalletAddress(
    wallet_address: string,
    drep_id: string
  ): Promise<User | undefined> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("name,email,wallet_address")
        .eq("wallet_address", wallet_address)
        .single();

      const isAdmin = await this.getIsUserAdmin(drep_id);

      if (error) throw error;
      if (!data) return undefined;
      return { ...data, is_admin: isAdmin } as User;
    } catch (err: any) {
      return err;
    }
  }
  static async getUserDelegatedTo(
    wallet_address: string
  ): Promise<{ pool_id: string | null; active: boolean } | undefined> {
    try {
      // @ts-ignore Blockfrost didn't update their SDK
      const { drep_id, active } = await blockfrost.accounts(wallet_address);

      return { pool_id: drep_id, active };
    } catch (err: any) {
      return err;
    }
  }
  static async getIsUserAdmin(drep_id: string): Promise<Boolean> {
    try {
      const { data } = await axios.get<{
        active: boolean;
      }>(
        `https://cardano-mainnet.blockfrost.io/api/v0/governance/dreps/${drep_id}`,
        {
          headers: {
            project_id: process.env.BLOCKFROST_PROJECT_ID,
          },
        }
      );

      // if (error) throw error;
      if (!data) return false;
      return data.active;
    } catch (err: any) {
      return false;
    }
  }
}
export { User, UserModel };
