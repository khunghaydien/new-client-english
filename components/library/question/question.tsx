import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Answer as IAnswer, Question as IQuestion } from "@/gql/graphql";
const Questions = ({
  questions,
  onChange,
}: {
  questions: IQuestion[];
  onChange: (value: string, id: string) => void;
}) => {
  return (
    <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
      <div className="flex flex-col gap-4">
        {questions?.map(
          ({ question, answers, id }: IQuestion, questionIndex: number) => (
            <div key={questionIndex} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 border-primary border rounded-full text-muted-foreground">
                  {questionIndex + 1}
                </div>
                {question}
              </div>
              <RadioGroup
                defaultValue="comfortable"
                onValueChange={(value: string) => onChange(value, id)}
                className="answer flex items-center w-full box-border gap-6"
              >
                {answers?.map(
                  ({ value, label, id }: IAnswer, answerIndex: number) => (
                    <div
                      className="flex items-center space-x-2 flex-grow w-[250px]"
                      key={answerIndex}
                    >
                      <RadioGroupItem value={value} id={id} />
                      <label htmlFor={id} className="cursor-pointer">
                        {label}
                      </label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>
          )
        )}
      </div>
    </ScrollArea>
  );
};
export default Questions;
