import { blockfrost } from "../blockfrost";
import supabase from "../supabase/db";

interface User {
  email: string;
  name: string;
  wallet_address: string;
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
      if (error) throw error;
      if (!data) return undefined;
      return data as User;
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
  static async getIsUserAdmin(
    wallet_address: string
  ): Promise<User | undefined> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("name,email,wallet_address", { count: 'exact', head: true })
        .eq("wallet_address", wallet_address)
        .single();
      if (error) throw error;
      if (!data) return undefined;
      return data as User;
    } catch (err: any) {
      return err;
    }
  }
}
export { User, UserModel };
