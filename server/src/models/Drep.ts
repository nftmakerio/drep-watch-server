import supabase from "../supabase/db";

interface Drep {
    email: string;
    name: string;
    pool_id: string;
}
class DrepModel {
    email: string;
    name: string;
    pool_id: string;
    constructor({ email, name, pool_id }: Drep) {
        this.email = email;
        this.name = name;
        this.pool_id = pool_id;
    }
    static async getDrep(id: string): Promise<Drep | undefined> {
        try {
            const { data, error } = await
                supabase
                    .from("dreps")
                    .select("*")
                    .eq("pool_id", id);
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
                    .textSearch('name', `${search_query}`);
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