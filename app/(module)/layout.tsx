"use client";
import React, { lazy, ReactNode } from "react";

const ThemeSwitcher = lazy(() => import("@/components/common/theme-switcher"));
const Logo = lazy(() => import("@/components/common/logo"));
const Profile = lazy(() => import("@/components/common/profile"));

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <nav className="w-full flex items-center justify-between px-12 py-4 text-sm rounded-lg border-b-2 border-muted-foreground">
        <Logo />
        <div className="flex items-center gap-6">
          <ThemeSwitcher />
          <Profile />
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default layout;
