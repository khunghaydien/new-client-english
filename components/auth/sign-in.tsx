"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { LOGIN_USER } from "@/graphql/mutation/auth";
import { scrollToFirstErrorMessage } from "@/lib/utils";
import authValidate from "./formik";

const initialValues = {
  email: "",
  password: "",
};

function PageComponent() {
  const { loginValidate } = authValidate();
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema: loginValidate,
    onSubmit: () => {
      setTimeout(() => {
        scrollToFirstErrorMessage();
      });
      handleLogin();
    },
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    variables: {
      email: formik.values.email,
      password: formik.values.password,
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleLogin = async () => {
    try {
      await loginUser();
      router.push("/");
    } catch (error) {}
  };
  const { values, setFieldValue } = formik;

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">Sign In</div>
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
        <Link href={"/forgot-password"} className="text-blue-500">
          Forgot password?
        </Link>
        <Button
          loading={loading}
          size={"lg"}
          type="submit"
          className="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
        >
          Sign In
        </Button>
      </form>
      <div className="fixed flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
        <span className="mr-2">{`Don't have an account?`}</span>
        <Link href={"/sign-up"} className="text-blue-500">
          <span>Sign up</span>
        </Link>
      </div>
    </>
  );
}

export default PageComponent;
