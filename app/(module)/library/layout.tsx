"use client";
import NavSidebar from "@/components/common/navigation-sidebar";
import { libraryRouter } from "@/const/router";
import React, { ReactNode } from "react";
function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start w-full">
      <nav className="w-[300px] min-h-[calc(100vh-70px)] rounded-lg border-r-2 border-muted-foreground p-6">
        <NavSidebar data={libraryRouter} />
      </nav>
      <section className="flex-grow h-full flex flex-col gap-1 p-6">
        <div>{children}</div>
      </section>
    </div>
  );
}

export default layout;
