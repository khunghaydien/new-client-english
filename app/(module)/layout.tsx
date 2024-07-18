"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, ReactNode, Suspense, useEffect, useState } from "react";

const ThemeSwitcher = lazy(() => import("@/components/common/theme-switcher"));
const Logo = lazy(() => import("@/components/common/logo"));
const Profile = lazy(() => import("@/components/common/profile"));

function layout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="">
      <nav className="w-full flex items-center justify-between px-12 py-4 text-sm rounded-lg border-b-2 border-muted-foreground">
        <Suspense fallback={<Skeleton className="h-8 w-16" />}>
          <Logo />
        </Suspense>
        <div className="flex items-center gap-6">
          {!mounted ? (
            <>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-[36px] w-[36px] rounded-full" />
            </>
          ) : (
            <>
              <Suspense fallback={<Skeleton className="h-8 w-16" />}>
                <ThemeSwitcher />
              </Suspense>
              <Suspense
                fallback={
                  <Skeleton className="h-[36px] w-[36px] rounded-full" />
                }
              >
                <Profile />
              </Suspense>
            </>
          )}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default layout;
