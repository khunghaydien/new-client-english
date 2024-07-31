"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { scrollToFirstErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { REGISTER_USER } from "@/graphql/mutation/auth";
import authValidate from "./formik";
const initialValues = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};
type IRegister = typeof initialValues;
function PageComponent() {
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { registerValidate } = authValidate();
  const formik = useFormik({
    initialValues,
    validationSchema: registerValidate,
    onSubmit: (values) => {
      setTimeout(() => {
        scrollToFirstErrorMessage();
      });
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: IRegister) => {
    try {
      await registerUser({
        variables: {
          email: values.email,
          password: values.password,
          name: values.name,
        },
      });
      router.push("/sign-in");
    } catch (error) {}
  };
  const { values, setFieldValue } = formik;

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">Sign up</div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <Input
          autoComplete="off"
          required
          label="Email"
          startIcon={<MdEmail />}
          placeholder="email"
          type="email"
          value={values.email}
          error={formik.touched.email && formik.touched.email}
          errorMessage={formik.errors.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
        />
        <Input
          autoComplete="off"
          required
          label="name"
          startIcon={<RxAvatar />}
          placeholder="name"
          type="name"
          value={values.name}
          error={formik.touched.name && formik.touched.name}
          errorMessage={formik.errors.name}
          onChange={(e) => setFieldValue("name", e.target.value)}
        />
        <Input
          autoComplete="off"
          label="Password"
          startIcon={<RiLockPasswordLine />}
          endIcon={
            showPassword ? (
              <FaEyeSlash
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(false);
                }}
              />
            ) : (
              <FaEye
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(true);
                }}
              />
            )
          }
          placeholder="password"
          type={showPassword ? "text" : "password"}
          value={values.password}
          error={formik.touched.password && formik.touched.password}
          errorMessage={formik.errors.password}
          onChange={(e) => setFieldValue("password", e.target.value)}
        />
        <Input
          autoComplete="off"
          label="Confirm password"
          startIcon={<RiLockPasswordLine />}
          endIcon={
            showConfirmPassword ? (
              <FaEyeSlash
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmPassword(false);
                }}
              />
            ) : (
              <FaEye
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmPassword(true);
                }}
              />
            )
          }
          placeholder="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={values.confirmPassword}
          error={
            formik.touched.confirmPassword && formik.touched.confirmPassword
          }
          errorMessage={formik.errors.confirmPassword}
          onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
        />
        <Button
          size={"lg"}
          loading={loading}
          type="submit"
          className={
            "w-full text-[17px] font-semibold text-white py-3 rounded-sm"
          }
        >
          Register
        </Button>
      </form>
      <div className="fixed flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
        <span className="mr-2">Have an account?</span>
        <Link href={"/sign-in"} className="text-blue-500">
          <span>Sign In</span>
        </Link>
      </div>
    </>
  );
}

export default PageComponent;
