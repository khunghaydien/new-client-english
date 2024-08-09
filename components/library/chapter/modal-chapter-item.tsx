import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { createChapterValidate } from "../formik";
import { Input } from "@/components/ui/input";
import { ECHAPTER, EDIFFICULTY } from "@/const/library";
import { convertEnumToOption, scrollToFirstErrorMessage } from "@/lib/utils";
import SingleSelect, { Option } from "@/components/ui/single-select";
interface IModalChapterItem {
  open: boolean;
  title: string;
  description: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onSubmit: (data: any) => void;
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
      type: {
        label: "",
        value: "",
      },
      difficulty: {
        label: "",
        value: "",
      },
    },
    validationSchema: createChapterValidate,
    onSubmit: (values) => {
      setTimeout(() => {
        scrollToFirstErrorMessage();
      });
      onClose();
      onSubmit(values);
    },
  });
  const { values, setFieldValue, errors, touched } = formik;
  const handleChange = useCallback((value: string, keyname: string) => {
    setFieldValue(keyname, value);
  }, []);

  const onSelect = useCallback((option: Option, keyname: string) => {
    setFieldValue(keyname, option);
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
            error={touched.name && touched.name}
            errorMessage={errors.name}
          ></Input>

          <Input
            placeholder="Description"
            label={"Description"}
            value={values.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, "description")
            }
            error={touched.description && touched.description}
            errorMessage={errors.description}
          ></Input>

          <SingleSelect
            label={"Type"}
            required={true}
            error={touched.type?.value && touched.type.value}
            errorMessage={errors.type?.value}
            options={convertEnumToOption(ECHAPTER)}
            handleSelect={(option: Option) => onSelect(option, "type")}
            selected={values.type}
            placeholder="Type"
          />

          <SingleSelect
            label={"Difficulty"}
            placeholder="Difficulty"
            required={true}
            selected={values.difficulty}
            options={convertEnumToOption(EDIFFICULTY)}
            handleSelect={(option: Option) => onSelect(option, "difficulty")}
            error={touched.difficulty?.value && touched.difficulty?.value}
            errorMessage={errors.difficulty?.value}
          />

          <DialogFooter className="flex gap-2 mt-6">
            <Button variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalChapterItem;
