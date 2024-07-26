"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/userStore";
import { useFormik } from "formik";
import React from "react";
import { FaPen } from "react-icons/fa";
import { FaStreetView } from "react-icons/fa6";

interface IModalProfile {
  type: "update" | "view" | "create";
}
const titleProfile = {
  update: "Edit your profile",
  view: "View your profile",
  create: "Create your profile",
};

const triggerProfile = {
  update: (
    <Button className="flex gap-2 items-center">
      <FaPen className="cursor-pointer" /> Update profile
    </Button>
  ),
  view: (
    <Button className="flex gap-2 items-center">
      <FaStreetView className="cursor-pointer" /> View profile
    </Button>
  ),
  create: (
    <Button className="flex gap-2 items-center">
      <FaPlus className="cursor-pointer" /> Create profile
    </Button>
  ),
};
function ModalProfile({ type }: IModalProfile) {
  const { updatedAt, createdAt, password, id, fullname, email, bio, avatar } =
    useUserStore((state) => state);
  const formik = useFormik({
    initialValues: {
      updatedAt,
      createdAt,
      password,
      id,
      fullname,
      email,
      bio,
      avatar,
    },
    onSubmit: () => {},
  });

  const { values, setFieldValue } = formik;
  return (
    <Dialog>
      <DialogTrigger>{triggerProfile[type]}</DialogTrigger>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogTitle>{titleProfile[type]}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-6 items-center mt-3">
          <div>
            <div className="flex gap-3 items-center">
              <Button>Update Avatar</Button>
              <Button variant={"outline"}>Remove Avatar</Button>
            </div>
          </div>
        </div>
        <form action="">
          <div>
            <Input
              required
              label="Fullname"
              placeholder="fullname"
              type="fullname"
              value={values.fullname}
              error={formik.touched.fullname && formik.touched.fullname}
              errorMessage={formik.errors.fullname}
              onChange={(e) => setFieldValue("fullname", e.target.value)}
            />
            <Input
              required
              label="Bio"
              placeholder="bio"
              type="bio"
              value={values.bio || ""}
              error={formik.touched.bio && formik.touched.bio}
              errorMessage={formik.errors.bio}
              onChange={(e) => setFieldValue("bio", e.target.value)}
            />
          </div>
          <div>
            <Input
              required
              label="Email"
              placeholder="email"
              type="email"
              value={values.email}
              error={formik.touched.email && formik.touched.email}
              errorMessage={formik.errors.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
            />
            <Input
              required
              label="Password"
              placeholder="password"
              type="password"
              value={values.password}
              error={formik.touched.password && formik.touched.password}
              errorMessage={formik.errors.password}
              onChange={(e) => setFieldValue("password", e.target.value)}
            />
          </div>
          <div>
            <Input
              required
              label="Created At"
              placeholder="createdAt"
              type="createdAt"
              value={values.createdAt}
              error={Boolean(
                formik.touched.createdAt && formik.touched.createdAt
              )}
              errorMessage={formik.errors.createdAt?.toString()}
              onChange={(e) => setFieldValue("createdAt", e.target.value)}
            />
            <Input
              required
              label="Updated At"
              placeholder="updatedAt"
              type="updatedAt"
              value={values.updatedAt || ""}
              error={Boolean(
                formik.touched.updatedAt && formik.touched.updatedAt
              )}
              errorMessage={formik.errors.updatedAt?.toString()}
              onChange={(e) => setFieldValue("updatedAt", e.target.value)}
            />
          </div>
        </form>
        <DialogFooter>
          <div className="w-full flex items-center justify-end gap-3">
            <Button variant={"outline"}>Cancel</Button>
            <Button>Update</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalProfile;
