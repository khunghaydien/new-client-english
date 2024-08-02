import { Button } from "@/components/ui/button";
import { GET_EXERCISE_BY_ID } from "@/graphql/query/library";
import { useQuery } from "@apollo/client";
import { isEmpty } from "lodash";
import Questions from "../question/question";
import QuestionPalette from "../question/question-palette";

const ExerciseDetail = ({ exerciseId }: { exerciseId: string }) => {
  const { data: exercise, loading: exerciseLoading } = useQuery(
    GET_EXERCISE_BY_ID,
    {
      skip: !exerciseId,
      variables: { id: exerciseId },
    }
  );
  return (
    <div className="pt-6 flex flex-col justify-between gap-6">
      <Questions
        questions={exercise?.getExerciseById?.questions || []}
        onChange={() => {}}
      />
      <div className="flex justify-between">
        <QuestionPalette
          questions={exercise?.getExerciseById?.questions || []}
          onClick={() => {}}
        />
        {!isEmpty(exercise?.getExerciseById?.questions) && (
          <div className="flex gap-3">
            <Button variant={"blue"}>Check Answer</Button>
            <Button>Submit</Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExerciseDetail;
