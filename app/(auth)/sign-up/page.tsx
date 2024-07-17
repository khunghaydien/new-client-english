"use client";
import Loading from "@/components/common/loading";
import React, { lazy, Suspense } from "react";

const SignUp = lazy(() => import("@/components/auth/sign-up"));

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <SignUp />
    </Suspense>
  );
}

export default page;
