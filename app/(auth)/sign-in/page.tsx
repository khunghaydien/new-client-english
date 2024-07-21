"use client";
import { WholeLoading } from "@/components/common/loading";
import React, { lazy, Suspense } from "react";

const SignIn = lazy(() => import("@/components/auth/sign-in"));

function page() {
  return (
    <Suspense fallback={<WholeLoading />}>
      <SignIn />
    </Suspense>
  );
}

export default page;
