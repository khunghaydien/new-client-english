import { CarouselPalette } from "@/components/common/carousel-palette";
import { Button } from "@/components/ui/button";
import { Question as IQuestion } from "@/gql/graphql";

export const QuestionPalette = ({
  questions,
  onClick,
  questionAnswers,
  isChecking,
  loading,
}: {
  isChecking: boolean;
  questions: IQuestion[];
  onClick: (id: string) => void;
  questionAnswers: Record<string, string>;
  loading: boolean;
}) => {
  return (
    <CarouselPalette
      loading={loading}
      items={questions}
      title="Question Palette:"
      maxChunkSize={10}
      renderButton={(question, index, chunkIndex, chunkSize) => (
        <Button
          className="w-[45px]"
          variant={
            isChecking
              ? question.answers?.find((answer) => answer.isCorrect)?.value ===
                questionAnswers[question.id]
                ? "success"
                : "destructive"
              : questionAnswers[question.id]
              ? "blue"
              : "outline"
          }
          onClick={() => onClick(question.id)}
          key={question.id}
        >{`${chunkIndex * chunkSize + index + 1}`}</Button>
      )}
    />
  );
};
