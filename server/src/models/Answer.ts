import supabase from "../supabase/db";

interface Answer {
    answer: string;
    question_id: number;
    drep_id: number;
}
class AnswerModel {
    private answer: string;
    private question_id: number;
    private drep_id: number;
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
            return data[0].answer;
        } catch (err: any) {
            return err;
        }
    }
}
export { Answer, AnswerModel };