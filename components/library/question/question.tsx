import ConditionalRender from "@/components/common/conditional-render";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Answer as IAnswer, Question as IQuestion } from "@/gql/graphql";
import clsx from "clsx";
import { useMemo } from "react";
import { MdClose } from "react-icons/md";
import { cloneDeep, isEmpty } from "lodash";
import { Button } from "@/components/ui/button";
import { scrollToQuestionById } from "@/lib/utils";
import { QuestionPalette } from "./question-palette";

export const AnsweringQuestion = ({
  questions,
  onChange,
  onCheckAnswer,
  questionAnswers,
  loading,
}: {
  questions: IQuestion[];
  onChange: (value: string, id: string) => void;
  onCheckAnswer: () => void;
  questionAnswers: Record<string, string>;
  loading: boolean;
}) => {
  return (
    <>
      <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
        <div className="flex flex-col gap-4">
          {questions?.map((question: IQuestion, index: number) => (
            <QuestionItem
              isChecking={false}
              key={index}
              question={question}
              number={index + 1}
              questionAnswers={questionAnswers}
              onChange={onChange}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex justify-between">
        <QuestionPalette
          loading={loading}
          isChecking={false}
          questions={questions}
          onClick={(id: string) => scrollToQuestionById(id)}
          questionAnswers={questionAnswers}
        />
        {!isEmpty(questions) && (
          <div className="flex gap-3">
            <Button variant={"blue"} onClick={onCheckAnswer}>
              Check Answer
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export const QuestionItem = ({
  number,
  question: questionItem,
  questionAnswers,
  isChecking,
  onChange,
}: {
  isChecking: boolean;
  number: number;
  question: IQuestion;
  questionAnswers: Record<string, string>;
  onChange?: (value: string, id: string) => void;
}) => {
  const { question, answers, id } = questionItem;

  const correctAnswer = useMemo(() => {
    if (isChecking) {
      const correctAnswer = answers?.find((a) => a.isCorrect);
      return correctAnswer as IAnswer;
    }
    return {} as IAnswer;
  }, [answers, questionAnswers[id], isChecking]);

  return (
    <div id={`question-${id}`} className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          className={clsx(
            "flex items-center justify-center w-6 h-6 border rounded-full bg-muted-foreground/10 border-muted-foreground"
          )}
        >
          {number}
        </div>
        {question}
      </div>
      <RadioGroup
        defaultValue="comfortable"
        className="answer flex items-center w-full box-border gap-6"
        onValueChange={(value: string) => {
          onChange && onChange(value, id);
        }}
        value={questionAnswers[id]}
        disabled={isChecking}
      >
        {answers?.map(({ value, label, id }: IAnswer, answerIndex: number) => (
          <div
            className="flex items-center space-x-2 flex-grow w-[250px]"
            key={answerIndex}
          >
            <RadioGroupItem value={value} id={id} />
            <label htmlFor={id} className="cursor-pointer">
              {label}
            </label>
          </div>
        ))}
      </RadioGroup>
      {isChecking && (
        <CheckingMessage
          question={questionItem}
          questionAnswers={questionAnswers}
          correctAnswer={correctAnswer}
        />
      )}
    </div>
  );
};

const CheckingMessage = ({
  question: { answers, id },
  questionAnswers,
  correctAnswer,
}: {
  question: IQuestion;
  questionAnswers: Record<string, string>;
  correctAnswer: IAnswer;
}) => {
  return (
    <div className="flex gap-1 flex-col border border-dotted border-muted-foreground p-2 rounded-lg">
      <ConditionalRender
        conditional={correctAnswer.value !== questionAnswers[id]}
        fallback={
          <div className="text-green-500">
            {correctAnswer.value}: {correctAnswer.label}
            {correctAnswer.description}
          </div>
        }
      >
        <ConditionalRender
          conditional={Boolean(questionAnswers[id])}
          fallback={
            <div className="text-destructive flex items-center">
              <MdClose className="text-destructive" />: No answer
            </div>
          }
        >
          <div className="text-destructive">
            {questionAnswers[id]}:
            {answers?.find((item) => item.value === questionAnswers[id])?.label}
            {
              answers?.find((item) => item.value === questionAnswers[id])
                ?.description
            }
          </div>
        </ConditionalRender>

        <div className="text-blue-500">
          {correctAnswer.value}: {correctAnswer.label}
          {correctAnswer.description}
        </div>
      </ConditionalRender>
    </div>
  );
};

export const CheckingQuestion = ({
  questions,
  questionAnswers,
  onTryAgain,
  loading,
}: {
  questions: IQuestion[];
  questionAnswers: Record<string, string>;
  onTryAgain: () => void;
  loading: boolean;
}) => {
  const checkingQuestion = cloneDeep(questions);
  const correctAnswers = useMemo(() => {
    return checkingQuestion?.filter(
      ({ answers, id }: IQuestion) =>
        answers?.find((answer: IAnswer) => answer?.isCorrect)?.value ===
        questionAnswers[id]
    );
  }, [checkingQuestion]);
  return (
    <>
      <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
        <div className="mb-6">
          <p>You have completed this test.</p>
          <p>{`Correct answers: ${correctAnswers?.length}/${checkingQuestion?.length}.`}</p>
          <p>{`Your score is: ${Math.ceil(
            (correctAnswers?.length / checkingQuestion?.length) * 100
          )}%.`}</p>
          <p>Check your answers:</p>
        </div>
        <div className="flex flex-col gap-6">
          {questions?.map((question: IQuestion, index: number) => (
            <QuestionItem
              isChecking
              key={index}
              question={question}
              number={index + 1}
              questionAnswers={questionAnswers}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex justify-between">
        <QuestionPalette
          loading={loading}
          isChecking
          questions={questions}
          onClick={(id: string) => scrollToQuestionById(id)}
          questionAnswers={questionAnswers}
        />
        {!isEmpty(questions) && (
          <div className="flex gap-3">
            <Button variant={"blue"} onClick={onTryAgain}>
              Try again
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
