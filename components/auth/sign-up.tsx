"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { scrollToFirstErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import authValidate from "./formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { signOut, signUp } from "@/reducers";
const initialValues = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};

function PageComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { registerValidate } = authValidate();
  const formik = useFormik({
    initialValues,
    validationSchema: registerValidate,
    onSubmit: () => {
      setTimeout(() => {
        scrollToFirstErrorMessage();
      });
      handleSubmit();
    },
  });

  const handleSubmit = async () => {
    const { email, password, name } = values;
    try {
      setLoading(true);
      dispatch(signUp({ email, password, name }))
        .unwrap()
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {}
  };
  const handleSignOut = async () => {
    try {
      setLoading(true);
      dispatch(signOut({ userId: "ss" }))
        .unwrap()
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {}
  };

  const { values, setFieldValue, errors, touched } = formik;

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
          error={touched.email && touched.email}
          errorMessage={errors.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
        />
        <Input
          autoComplete="off"
          required
          label="User name"
          startIcon={<RxAvatar />}
          placeholder="name"
          type="name"
          value={values.name}
          error={touched.name && touched.name}
          errorMessage={errors.name}
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
          error={touched.password && touched.password}
          errorMessage={errors.password}
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
          error={touched.confirmPassword && touched.confirmPassword}
          errorMessage={errors.confirmPassword}
          onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
        />
        <Button
          size={"lg"}
          type="submit"
          loading={loading}
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
      <Button onClick={handleSignOut}>Sign Out</Button>
    </>
  );
}

export default PageComponent;
