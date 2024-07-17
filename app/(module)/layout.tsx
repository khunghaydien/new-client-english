"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, ReactNode, Suspense } from "react";

const ThemeSwitcher = lazy(() => import("@/components/common/theme-switcher"));
const Logo = lazy(() => import("@/components/common/logo"));
const Profile = lazy(() => import("@/components/common/profile"));

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-6">
      <nav className="w-full flex items-center justify-between py-2 px-4 text-sm">
        <Suspense fallback={<Skeleton className="h-8 w-16" />}>
          <Logo />
        </Suspense>
        <div className="flex items-center gap-6">
          <Suspense fallback={<Skeleton className="h-8 w-16" />}>
            <ThemeSwitcher />
          </Suspense>
          <Suspense
            fallback={<Skeleton className="h-[36px] w-[36px] rounded-full" />}
          >
            <Profile />
          </Suspense>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default layout;
