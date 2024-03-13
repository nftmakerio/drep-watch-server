import supabase from "../supabase/db";

interface Question {
    theme: string;
    question_title: string;
    question_description: string;
    user_id: number;
    drep_id: string;
}
class QuestionModel {
    private theme: string;
    private question_title: string;
    private question_description: string;
    private user_id: number;
    private drep_id: string;

    constructor({ theme, question_title, question_description, user_id, drep_id }: Question) {
        this.theme = theme;
        this.question_title = question_title;
        this.question_description = question_description;
        this.user_id = user_id;
        this.drep_id = drep_id;
    }
    async save(): Promise<boolean | string> {
        try {
            const newQuestion = {
                theme: this.theme,
                question_title: this.question_title,
                question_description: this.question_description,
                user_id: this.user_id,
                drep_id: this.drep_id
            }
            const { data, error } = await supabase.from("questions").insert(newQuestion).single();
            if (error)
                throw error;
            return true;
        } catch (err: any) {
            return err;
        }
    }
    //method to get a drep id 
    static async getQuestionById(id: number): Promise<Question | undefined> {
        try {
            const { data, error } = await supabase
                .from('questions')
                .select('theme, question_title, question_description, user_id,drep_id')
                .eq('id', id);

            if (error)
                throw error;
            const question = {
                theme: data[0].theme,
                question_title: data[0].question_title,
                question_description: data[0].question_description,
                user_id: data[0].user_id,
                drep_id: data[0].drep_id
            }
            if (!data)
                return undefined;
            return question as Question;
        } catch (err: any) {
            return err;
        }
    }
    //method to fetch the number o questions asked to a drep provided its drep_id
    static async getDrepQuestions(id: string): Promise<number | undefined> {
        try {
            const { data, error } = await
                supabase
                    .from("questions")
                    .select("*")
                    .eq("drep_id", id);
            if (error)
                throw error;
            if (!data)
                return undefined;
            return data.length;
        } catch (err: any) {
            return err;
        }
    }
    static async getQuestionByTheme(theme: string): Promise<Question[] | undefined> {
        try {
            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .eq('theme', theme);

            if (error)
                throw error;
            if (!data)
                return undefined;
            console.log(data);
            const questions: (Question & { id: number })[] = data.map((item) => {
                return {
                    id: item.id,
                    theme: item.theme,
                    question_title: item.question_title,
                    question_description: item.question_description,
                    user_id: item.user_id,
                    drep_id: item.drep_id
                }
            });
            console.log(questions);
            return questions;

        } catch (err: any) {
            console.log(err);
            return err;
        }
    }
    static async getLatestQuestions(
        limit: number = 20
    ): Promise<Question[] | undefined> {
        try {
            const { data, error } = await supabase
                .from("questions")
                .select("*")
                .order("id", { ascending: false })
                .limit(limit);

            if (error) throw error;
            if (!data) return undefined;
            const questions: (Question & { id: number })[] = data.map((item) => {
                return {
                    id: item.id,
                    theme: item.theme,
                    question_title: item.question_title,
                    question_description: item.question_description,
                    user_id: item.user_id,
                    drep_id: item.drep_id,
                };
            });
            return questions;
        } catch (err: any) {
            return err;
        }
    }
}

export { Question, QuestionModel };