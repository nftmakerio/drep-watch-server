import supabase from "../supabase/db";

interface Drep {
  email: string | null;
  name: string | null;
  drep_id: string;
}
class DrepModel {
  email: string | null;
  name: string | null;
  drep_id: string;
  constructor({ email, name, drep_id }: Drep) {
    this.email = email;
    this.name = name;
    this.drep_id = drep_id;
  }
  static async getDrep(id: string): Promise<Drep | undefined> {
    try {
      const { data, error } = await supabase
        .from("dreps")
        .select("*")
        .eq("drep_id", id);
      if (error) throw error;
      if (!data) return undefined;
      return data[0] as Drep;
    } catch (err: any) {
      return err;
    }
  }
  static async getDrepByQuery(
    search_query: string
  ): Promise<Drep[] | undefined> {
    try {
      const { data, error } = await supabase
        .from("dreps")
        .select("*")
        .ilike("name", `${search_query}%`);
      console.log(data);

      if (error) throw error;
      if (!data) return undefined;
      return data;
    } catch (err: any) {
      return err;
    }
  }
  static async getDreps(limit: number): Promise<Drep[] | undefined> {
    try {
      const { data, error } = await supabase
        .from("dreps")
        .select("*")
        .limit(limit);
      console.log(data);
      if (error) throw error;
      if (!data) return undefined;
      return data;
    } catch (err: any) {
      return err;
    }
  }
  static async getDrepProposals(address: string): Promise<
    | {
        ada_amount: string | null;
        agreed: string[] | null;
        catalyst_link: string | null;
        category: string | null;
        created_at: string;
        description: string | null;
        fund_no: number | null;
        id: string;
        not_agreed: string[] | null;
        title: string | null;
      }[]
    | undefined
  > {
    try {
      const { data: agreed_proposals, error: agreed_error } = await supabase
        .from("proposals")
        .select("*")
        .contains("agreed", [address]);

      const { data: not_agreed_proposals, error: not_agreed_error } =
        await supabase
          .from("proposals")
          .select("*")
          .contains("not_agreed", [address]);

      console.log(agreed_proposals?.length, not_agreed_proposals?.length);

      if (not_agreed_error || agreed_error) throw not_agreed_error;
      if (!agreed_proposals) return undefined;
      return [...agreed_proposals, ...not_agreed_proposals];
    } catch (err: any) {
      return err;
    }
  }
}
export default DrepModel;
