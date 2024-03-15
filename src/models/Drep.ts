import supabase from "../supabase/db";

interface Drep {
    email: string;
    name: string;
    drep_id: string;
}
class DrepModel {
    email: string;
    name: string;
    drep_id: string;
    constructor({ email, name, drep_id }: Drep) {
        this.email = email;
        this.name = name;
        this.drep_id = drep_id;
    }
    static async getDrep(id: string): Promise<Drep | undefined> {
        try {
            const { data, error } = await
                supabase
                    .from("dreps")
                    .select("*")
                    .eq("drep_id", id);
            if (error)
                throw error;
            if (!data)
                return undefined;
            return data[0] as Drep;
        } catch (err: any) {
            return err;
        }
    }
    static async getDrepByQuery(search_query: string): Promise<Drep[] | undefined> {
        try {
            const { data, error } = await
                supabase
                    .from("dreps")
                    .select('*')
                    .ilike("name", `${search_query}%`);
            console.log(data);

            if (error)
                throw error;
            if (!data)
                return undefined;
            return data;
        } catch (err: any) {
            return err;
        }
    }
    static async getDreps(limit: number): Promise<Drep[] | undefined> {
        try {
            const { data, error } = await
                supabase
                    .from("dreps")
                    .select('*')
                    .limit(limit);
            console.log(data);
            if (error)
                throw error;
            if (!data)
                return undefined;
            return data;
        } catch (err: any) {
            return err;
        }
    }
}
export default DrepModel;