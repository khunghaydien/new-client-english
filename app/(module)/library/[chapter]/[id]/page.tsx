"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GET_EXERCISES } from "@/graphql/query/library";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ExerciseList from "@/components/library/exercise/exercise-list";
import ExerciseDetail from "@/components/library/exercise/exercise-detail";

function page() {
  const { id } = useParams();
  const { data: exercises, loading: exercisesLoading } = useQuery(
    GET_EXERCISES,
    {
      skip: !id,
      variables: { chapterId: id },
    }
  );
  const [exerciseId, setExerciseId] = useState("");

  useEffect(() => {
    if (exercises?.getExercises[0]?.id)
      setExerciseId(exercises?.getExercises[0]?.id);
  }, [exercises]);

  return (
    <Tabs defaultValue={"exercise"}>
      <div className="flex justify-between">
        <TabsList>
          <TabsTrigger value="exercise">
            <div>Exercises</div>
          </TabsTrigger>
          <TabsTrigger value="explanation">
            <div>Explanation</div>
          </TabsTrigger>
          <TabsTrigger value="download">
            <div>Download</div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={"exercise"}>
          <ExerciseList
            exercises={exercises?.getExercises ?? []}
            loading={exercisesLoading}
            exerciseId={exerciseId}
            setExerciseId={setExerciseId}
          />
        </TabsContent>
      </div>
      <TabsContent value={"exercise"}>
        <ExerciseDetail exerciseId={exerciseId} />
      </TabsContent>
      <TabsContent value={"explanation"}>
        <div>Explanation</div>
      </TabsContent>
      <TabsContent value={"download"}>
        <div>Download</div>
      </TabsContent>
    </Tabs>
  );
}

export default page;
