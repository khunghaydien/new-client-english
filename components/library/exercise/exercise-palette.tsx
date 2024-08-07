import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { Exercise as IExercise } from "@/gql/graphql";
import { CarouselPalette } from "@/components/common/carousel-palette";

export const ExercisePalette = ({
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
    <CarouselPalette
      loading={loading}
      items={exercises}
      title="Exercises:"
      renderButton={(exercise, index, chunkIndex, chunkSize) => (
        <Button
          className="w-[45px]"
          variant={exerciseId === exercise.id ? "default" : "outline"}
          onClick={() => setExerciseId(exercise.id)}
          key={exercise.id}
        >{`${chunkIndex * chunkSize + index + 1}`}</Button>
      )}
    />
  );
};
