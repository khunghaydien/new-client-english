import { ListLoading } from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { Exercise as IExercise } from "@/gql/graphql";
const ExerciseList = ({
  exercises,
  exerciseId,
  setExerciseId,
  loading,
}: {
  loading: boolean;
  exercises: IExercise[];
  exerciseId?: string;
  setExerciseId: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      {loading ? (
        <ListLoading
          width={36}
          height={36}
          direction={"horizontal"}
          quantity={3}
        />
      ) : (
        <div className="flex items-center gap-2">
          <Button variant={"secondary"}>Exercises:</Button>
          {exercises?.map((exerciseItem: IExercise, index: number) => (
            <Button
              variant={exerciseId === exerciseItem.id ? "default" : "outline"}
              onClick={() => setExerciseId(exerciseItem.id)}
              key={index}
            >{`${index + 1}`}</Button>
          ))}
        </div>
      )}
    </>
  );
};
export default ExerciseList;
