import supabase from "../supabase/db";

interface Answer {
  answer: string;
  uuid: string;
  drep_id: string;
  drep_name?: string | undefined;
}
class AnswerModel {
  private answer: string;
  private uuid: string;
  private drep_id: string;
  constructor({ answer, uuid, drep_id }: Answer) {
    this.answer = answer;
    this.uuid = uuid;
    this.drep_id = drep_id;
  }
  async save(): Promise<{
    answer: string;
    drep_id: string | null;
    id: number;
    uuid: string | null;
  } | undefined> {
    try {
      const { data, error } = await supabase
        .from("answers")
        .insert({
          answer: this.answer,
          drep_id: this.drep_id,
          uuid: this.uuid,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err: any) {
      return err;
    }
  }
  //method to get answer by questionId
  static async getAnswerByQuestionId(
    questionId: string
  ): Promise<(Answer & { id: number }) | undefined> {
    try {
      const { data, error } = await supabase
        .from("answers")
        .select("*")
        .eq("uuid", questionId)
        .maybeSingle();

      if (error) throw error;
      if (!data?.drep_id) return undefined;

      const { data: drepData } = await supabase
        .from("dreps")
        .select("name")
        .eq("drep_id", data.drep_id)
        .single();

      return { ...data, drep_name: drepData?.name } as Answer & {
        id: number;
      };
    } catch (err: any) {
      return err;
    }
  }
  //Method to fetch the number of answers provided by a drep
  static async getDrepAnswers(id: string): Promise<number | undefined> {
    try {
      const { data, error } = await supabase
        .from("answers")
        .select("*")
        .eq("drep_id", id);
      if (error) throw error;
      if (!data) return undefined;
      return data.length;
    } catch (err: any) {
      return err;
    }
  }
  static async getLatestDrepAnswers(
    limit = 10
  ): Promise<(Answer & { id: number })[] | undefined> {
    try {
      const { data, error } = await supabase
        .from("answers")
        .select("*")
        .order("id", { ascending: false })
        .limit(limit);
      if (error) throw error;
      if (!data) return undefined;

      const answers: (Answer & { id: number })[] = [];

      for (const item of data) {
        if (!item.drep_id || !item.uuid) continue;
        const { data: drepData } = await supabase
          .from("dreps")
          .select("name")
          .eq("drep_id", item.drep_id)
          .single();

        answers.push({
          id: item.id,
          answer: item.answer,
          uuid: item.uuid,
          drep_id: item.drep_id,
          drep_name: drepData?.name,
        });
      }

      return answers;
    } catch (err: any) {
      return err;
    }
  }
}
export { Answer, AnswerModel };
