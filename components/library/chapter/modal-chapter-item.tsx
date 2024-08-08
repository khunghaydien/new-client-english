import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Chapter as IChapter } from "@/gql/graphql";
import { useFormik } from "formik";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { createChapterValidate } from "../formik";
import { Input } from "@/components/ui/input";
interface IModalChapterItem {
  open: boolean;
  title: string;
  description: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onSubmit: (data: IChapter[]) => void;
}

function ModalChapterItem({
  open,
  setOpen,
  title,
  description,
  onClose,
  onSubmit,
}: IModalChapterItem) {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      type: "",
      difficulty: "",
    },
    validationSchema: createChapterValidate,
    onSubmit: () => {},
  });
  const { values, setFieldValue, errors, touched } = formik;

  const handleChange = useCallback((value: string, keyname: string) => {
    setFieldValue(keyname, value);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="flex gap-6 flex-col">
          <Input
            placeholder="Name"
            label={"Name"}
            value={values.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, "name")
            }
            error={formik.touched.name && formik.touched.name}
            errorMessage={formik.errors.name}
          ></Input>

          <Input
            placeholder="Description"
            label={"Description"}
            value={values.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, "description")
            }
            error={formik.touched.description && formik.touched.description}
            errorMessage={formik.errors.description}
          ></Input>

          <DialogFooter className="flex gap-2 mt-6">
            <Button variant={"outline"}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalChapterItem;
