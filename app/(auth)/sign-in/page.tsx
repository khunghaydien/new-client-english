"use client";
import Loading from "@/components/common/loading";
import React, { lazy, Suspense } from "react";

const SignIn = lazy(() => import("@/components/auth/sign-in"));

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <SignIn />
    </Suspense>
  );
}

export default page;
