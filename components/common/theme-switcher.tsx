"use client";
import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <Tabs defaultValue={theme ?? "dark"}>
      <TabsList className="border">
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon className="h-[1.2rem w-[1.2rem]"></SunIcon>
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon className="h-[1.2rem w-[1.2rem] rotate-90 transition-none dark:rotate-0"></MoonIcon>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ThemeSwitcher;
