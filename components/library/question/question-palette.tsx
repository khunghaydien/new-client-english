import { Button } from "@/components/ui/button";
import { Question as IQuestion } from "@/gql/graphql";
export const QuestionPalette = ({
  questions,
  onClick,
  questionAnswers,
  isChecking,
}: {
  isChecking: boolean;
  questions: IQuestion[];
  onClick: (id: string) => void;
  questionAnswers: Record<string, string>;
}) => {
  return (
    <div className="flex gap-2">
      <Button variant={"secondary"}>Question Palette:</Button>
      {questions?.map(({ id, answers }: IQuestion, index: number) => (
        <Button
          variant={
            isChecking
              ? answers?.find((answer) => answer.isCorrect)?.value ===
                questionAnswers[id]
                ? "success"
                : "destructive"
              : questionAnswers[id]
              ? "blue"
              : "outline"
          }
          onClick={() => onClick(id)}
          key={index}
        >{`${index + 1}`}</Button>
      ))}
    </div>
  );
};
