import supabase from "../supabase/db";

interface Answer {
    answer: string;
    question_id: number;
    drep_id: string;
}
class AnswerModel {
    private answer: string;
    private question_id: number;
    private drep_id: string;
    constructor({ answer, question_id, drep_id }: Answer) {
        this.answer = answer;
        this.question_id = question_id;
        this.drep_id = drep_id;
    }
    async save(): Promise<boolean | string> {
        try {
            const newAnswer = {
                answer: this.answer,
                question_id: this.question_id,
                drep_id: this.drep_id
            }
            const { data, error } = await supabase.from("answers").insert(newAnswer).single();
            if (error)
                throw error;
            return true;
        } catch (err: any) {
            return err;
        }
    }
    //method to get answer by questionId
    static async getAnswerByQuestionId(questionId: number): Promise<string | undefined> {
        try {
            const { data, error } = await supabase
                .from("answers")
                .select("answer")
                .eq("question_id", questionId);
            if (error)
                throw error;
            if (!data)
                return undefined;
            return data.length > 0 ? data[0].answer : "";
        } catch (err: any) {
            return err;
        }
    }
    //Method to fetch the number of answers provided by a drep
    static async getDrepAnswers(id: string): Promise<number | undefined> {
        try {
            const { data, error } = await
                supabase
                    .from("answers")
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
    static async getLatestDrepAnswers(limit = 10): Promise<(Answer & { id: number })[] | undefined> {
        try {
            const { data, error } = await
                supabase
                    .from("answers")
                    .select("*")
                    .order("id", { ascending: false })
                    .limit(limit);
            if (error)
                throw error;
            if (!data)
                return undefined;
            const answers: (Answer & { id: number })[] = data.map((item) =>
            ({
                id: item.id,
                answer: item.answer,
                question_id: item.question_id,
                drep_id: item.drep_id
            }));
            console.log(data)
            return answers
        } catch (err: any) {
            return err;
        }
    }
}
export { Answer, AnswerModel };