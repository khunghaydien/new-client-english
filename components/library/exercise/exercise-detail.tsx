import {
  GET_ANSWER_EXERCISE_BY_ID,
  GET_EXERCISE_BY_ID,
} from "@/graphql/query/library";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { Question as IQuestion } from "@/gql/graphql";
import ConditionalRender from "@/components/common/conditional-render";
import { AnsweringQuestion, CheckingQuestion } from "../question/question";

const ExerciseDetail = ({ exerciseId }: { exerciseId: string }) => {
  const [isCheckAnswer, setIsCheckAnswer] = useState<boolean>(false);

  useEffect(() => {
    setIsCheckAnswer(false);
  }, [exerciseId]);

  const { data: answeringExercise } = useQuery(GET_EXERCISE_BY_ID, {
    variables: { id: exerciseId },
  });

  const [loadExerciseAnswer, { data: checkingExercise }] = useLazyQuery(
    GET_ANSWER_EXERCISE_BY_ID
  );

  const initialValues = useMemo(() => {
    if (answeringExercise?.getExerciseById?.questions) {
      return answeringExercise.getExerciseById.questions.reduce(
        (acc: Record<string, string>, question: IQuestion) => {
          acc[question.id] = "";
          return acc;
        },
        {}
      );
    }
    return {};
  }, [answeringExercise?.getExerciseById?.questions]);

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const { setFieldValue, values } = formik;

  const handleAnswer = useCallback((value: string, questionId: string) => {
    setFieldValue(questionId, value);
  }, []);

  const handleCheckAnswer = () => {
    setIsCheckAnswer(true);
    loadExerciseAnswer({ variables: { id: exerciseId } });
  };

  const onTryAgain = () => {
    setIsCheckAnswer(false);
  };

  return (
    <div className="pt-6 flex flex-col justify-between gap-6">
      <ConditionalRender
        conditional={!isCheckAnswer}
        fallback={
          <CheckingQuestion
            questions={checkingExercise?.getExerciseById?.questions}
            questionAnswers={values}
            onTryAgain={onTryAgain}
          />
        }
      >
        <AnsweringQuestion
          questionAnswers={values}
          questions={answeringExercise?.getExerciseById?.questions || []}
          onChange={handleAnswer}
          onCheckAnswer={handleCheckAnswer}
        />
      </ConditionalRender>
    </div>
  );
};
export default ExerciseDetail;
