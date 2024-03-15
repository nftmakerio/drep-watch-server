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
    static async getUserByWalletAddress(wallet_address: string): Promise<User | undefined> {
        try {
            const { data, error } = await
                supabase
                    .from("users")
                    .select("name,email,wallet_address")
                    .eq("wallet_address", wallet_address).single();
            if (error)
                throw error;
            if (!data)
                return undefined;
            return data as User;
        } catch (err: any) {
            return err;
        }
    }
}
export { User, UserModel };