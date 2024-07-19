import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Exercise as IExercise } from "@/gql/graphql";
import React from "react";
const QuestionNumber = ({ number }: { number: number }) => {
  return (
    <div className="flex items-center justify-center rounded-full bg-primary w-6 h-6 text-white">
      {number}
    </div>
  );
};
const Question = ({}) => {
  return (
    <>
      <QuestionNumber number={1} />
    </>
  );
};

const Exercise = ({}: IExercise) => {
  return (
    <>
      <div>{"Present simple forms of 'to be' - am/is/are"}</div>
      <div>{"Exercise 1"}</div>
      <div>
        {
          "Choose the correct present simple forms of 'to be' for the gaps below."
        }
      </div>
      <Question />
    </>
  );
};

function page() {
  return (
    <Tabs defaultValue={"exercise"}>
      <TabsList className="border">
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
        <Exercise
          chapter={{
            __typename: undefined,
            createdAt: undefined,
            description: "",
            exercises: [],
            explanations: [],
            id: "",
            level: "",
            name: "",
            status: "",
            type: [],
            updatedAt: undefined,
            viewed: 0,
          }}
          chapterId={""}
          construction={""}
          createdAt={undefined}
          id={""}
          name={""}
          questions={[]}
          type={""}
          updatedAt={undefined}
        />
      </TabsContent>
      <TabsContent value={"explanation"}>
        <div>s</div>
      </TabsContent>
      <TabsContent value={"download"}>
        <div>c</div>
      </TabsContent>
    </Tabs>
  );
}

export default page;
