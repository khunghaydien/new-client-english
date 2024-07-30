"use client";
import { ListLoading } from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseState, IAnswer, IExercise, IQuestion } from "@/interfaces";
import {
  getExercise,
  getExercises,
  selectExercise,
} from "@/reducers/library/exercise.reducer";
import { AppDispatch } from "@/stores";
import { useQuery } from "@apollo/client";
import { isEmpty } from "lodash";
import { useParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const QuestionPalette = ({
  questions,
  onClick,
}: {
  questions: IQuestion[];
  onClick: (id: string) => void;
}) => {
  return (
    <div className="flex gap-2">
      <Button variant={"secondary"}>Question Palette:</Button>
      {questions?.map((questionItem: IQuestion, index: number) => (
        <Button
          variant={"outline"}
          onClick={() => onClick(questionItem.id)}
          key={index}
        >{`${index + 1}`}</Button>
      ))}
    </div>
  );
};

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

const Exercise = ({ exerciseId }: { exerciseId: string }) => {
  const { exercise } = useSelector(selectExercise);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleExercise = async () => {
    try {
      setLoading(true);
      dispatch(getExercise(exerciseId))
        .unwrap()
        .finally(() => setLoading(false));
    } catch (error) {}
  };
  useEffect(() => {
    handleExercise();
  }, []);
  return (
    <div className="pt-6 flex flex-col justify-between gap-6">
      <Questions questions={exercise?.questions || []} onChange={() => {}} />
      <div className="flex justify-between">
        <QuestionPalette
          questions={exercise?.questions || []}
          onClick={() => {}}
        />
        {!isEmpty(exercise?.questions) && (
          <div className="flex gap-3">
            <Button variant={"blue"}>Check Answer</Button>
            <Button>Submit</Button>
          </div>
        )}
      </div>
    </div>
  );
};

function PageComponent() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const { getExercises: data }: ExerciseState = useSelector(selectExercise);
  const { exercises, pagination } = data;
  const [exerciseId, setExerciseId] = useState("");

  useEffect(() => {
    if (exercises?.[0]?.id) setExerciseId(exercises?.[0]?.id);
  }, [exercises]);

  useEffect(() => {
    handleExercises();
  }, []);

  const handleExercises = async () => {
    try {
      setLoading(true);
      dispatch(getExercises())
        .unwrap()
        .finally(() => {
          setLoading(false);
        });
    } catch {}
  };

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
            exercises={exercises ?? []}
            loading={loading}
            exerciseId={exerciseId}
            setExerciseId={setExerciseId}
          />
        </TabsContent>
      </div>
      <TabsContent value={"exercise"}>
        <Exercise exerciseId={exerciseId} />
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

export default PageComponent;
