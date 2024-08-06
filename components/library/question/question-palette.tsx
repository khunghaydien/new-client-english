import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Question as IQuestion } from "@/gql/graphql";
// Utility function to chunk the array
const questionArray = (questions: IQuestion[], chunkSize: number) => {
  const result = [];
  for (let i = 0; i < questions?.length; i += chunkSize) {
    result.push(questions?.slice(i, i + chunkSize));
  }
  return result;
};

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
  const chunkSize = 10;
  const questionList = questionArray(questions, chunkSize);
  return (
    <div className="flex">
      <Button variant={"secondary"}>Question Palette:</Button>
      <div className="w-[500px] ml-20">
        <Carousel >
          <CarouselContent>
            {questionList.map((questions, questionListIndex) => (
              <CarouselItem key={questionListIndex} className="flex justify-evenly">
                {questions?.map(({ id, answers }: IQuestion, questionsIndex: number) => (
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
                    key={questionsIndex}
                  >{`${questionListIndex * 10 + questionsIndex + 1}`}</Button>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};