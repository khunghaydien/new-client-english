"use client";
import React, { lazy, ReactNode } from "react";
const OtherSignIn = lazy(() => import("@/components/auth/other-sign-in"));

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-full flex items-center justify-center gap-12 pt-24">
      <div className="w-full max-w-[500px]">{children}</div>
      <div className="flex items-center gap-2 justify-center flex-col">
        <div className="h-[200px] flex"></div>
        <div className="border rounded-full border-primary w-[50px] h-[50px] flex items-center justify-center">
          Or
        </div>
        <div className="h-[200px] flex "></div>
      </div>
      <OtherSignIn />
    </div>
  );
}

export default layout;
