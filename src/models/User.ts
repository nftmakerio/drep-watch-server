import { blockfrost } from "../blockfrost";
import supabase from "../supabase/db";

interface User {
  email: string;
  name: string;
  wallet_address: string;
  is_admin?: {
    drep_id: string;
  };
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
    wallet_address: string
  ): Promise<User | undefined> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("name,email,wallet_address")
        .eq("wallet_address", wallet_address)
        .single();

      const isAdmin = await this.getIsUserAdmin(wallet_address);

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
      const { pool_id, active } = await blockfrost.accounts(wallet_address);

      return { pool_id, active };
    } catch (err: any) {
      return err;
    }
  }
  static async getIsUserAdmin(wallet_address: string): Promise<
    | {
        drep_id: string;
      }
    | undefined
  > {
    try {
      const { data, error } = await supabase
        .from("dreps")
        .select("drep_id")
        .eq("wallet_address", wallet_address)
        .single();
      if (error) throw error;
      if (!data) return undefined;
      return data as {
        drep_id: string;
      };
    } catch (err: any) {
      return err;
    }
  }
}
export { User, UserModel };
