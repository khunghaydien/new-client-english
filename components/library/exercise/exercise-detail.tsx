import { Button } from "@/components/ui/button";
import { GET_EXERCISE_BY_ID } from "@/graphql/query/library";
import { useQuery } from "@apollo/client";
import { isEmpty } from "lodash";
import Questions from "../question/question";
import QuestionPalette from "../question/question-palette";
import { useCallback, useMemo, useState } from "react";
import { useFormik } from "formik";
import { Question as IQuestion } from "@/gql/graphql";
const ExerciseDetail = ({ exerciseId }: { exerciseId: string }) => {
  const { data: exercise } = useQuery(GET_EXERCISE_BY_ID, {
    skip: !exerciseId,
    variables: { id: exerciseId },
  });
  const [isCheckAnswer, setIsCheckAnswer] = useState<boolean>(false);

  const initialValues = useMemo(() => {
    if (exercise?.getExerciseById?.questions) {
      return exercise.getExerciseById.questions.reduce(
        (acc: Record<string, string>, question: IQuestion) => {
          acc[question.id] = "";
          return acc;
        },
        {}
      );
    }
    return {};
  }, [exercise?.getExerciseById?.questions]);

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
  };

  return (
    <div className="pt-6 flex flex-col justify-between gap-6">
      <form>
        <Questions
          isCheckAnswer={isCheckAnswer}
          questions={exercise?.getExerciseById?.questions || []}
          onChange={handleAnswer}
        />
        <div className="flex justify-between">
          <QuestionPalette
            questions={exercise?.getExerciseById?.questions || []}
            onClick={() => {}}
          />
          {!isEmpty(exercise?.getExerciseById?.questions) && (
            <div className="flex gap-3">
              <Button variant={"blue"} onClick={handleCheckAnswer}>
                Check Answer
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default ExerciseDetail;
