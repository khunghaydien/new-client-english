import { Button } from "@/components/ui/button";
import { Question as IQuestion } from "@/gql/graphql";
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
export default QuestionPalette;
