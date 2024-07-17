"use client";
import NavSidebar, { INavSidebar } from "@/components/common/navigation-sidebar";
import InputAutoComplete from "@/components/ui/input-auto-complete";
import React, { ReactNode } from "react";
const basic: INavSidebar[] = [
  {
    label: "Grammar",
    href: "/grammar",
    children: [
      {
        label: "A1 Elementary",
        href: "/grammar/elementary",
        children: [],
      },
      {
        label: "A2 Pre Intermediate",
        href: "/grammar/pre-intermediate",
        children: [],
      },
      {
        label: "B1 Intermediate",
        href: "/grammar/intermediate",
        children: [],
      },
      {
        label: "B1+ Upper Intermediate",
        href: "/grammar/upper-intermediate",
        children: [],
      },
      {
        label: "B2 Pre Advanced",
        href: "/grammar/pre-advanced",
        children: [],
      },
    ],
  },
  {
    label: "Vacabulary",
    href: "/vacabulary/user",
    children: [
      {
        label: "A1 Elementary",
        href: "/vacabulary/elementary",
        children: [],
      },
      {
        label: "A2 Pre Intermediate",
        href: "/vacabulary/pre-intermediate",
        children: [],
      },
      {
        label: "B1 Intermediate",
        href: "/vacabulary/intermediate",
        children: [],
      },
      {
        label: "B1+ Upper Intermediate",
        href: "/vacabulary/upper-intermediate",
        children: [],
      },
      {
        label: "B2 Pre Advanced",
        href: "/vacabulary/pre-advanced",
        children: [],
      },
    ],
  },
  {
    label: "Listening",
    href: "/listening/user",
    children: [
      {
        label: "A1 Elementary",
        href: "/listening/elementary",
        children: [],
      },
      {
        label: "A2 Pre Intermediate",
        href: "/listening/pre-intermediate",
        children: [],
      },
      {
        label: "B1 Intermediate",
        href: "/listening/intermediate",
        children: [],
      },
      {
        label: "B1+ Upper Intermediate",
        href: "/listening/upper-intermediate",
        children: [],
      },
      {
        label: "B2 Pre Advanced",
        href: "/listening/pre-advanced",
        children: [],
      },
    ],
  },
  {
    label: "Writing",
    href: "/writing/user",
    children: [
      {
        label: "A1 Elementary",
        href: "/writing/elementary",
        children: [],
      },
      {
        label: "A2 Pre Intermediate",
        href: "/writing/pre-intermediate",
        children: [],
      },
      {
        label: "B1 Intermediate",
        href: "/writing/intermediate",
        children: [],
      },
      {
        label: "B1+ Upper Intermediate",
        href: "/writing/upper-intermediate",
        children: [],
      },
      {
        label: "B2 Pre Advanced",
        href: "/writing/pre-advanced",
        children: [],
      },
    ],
  },
  {
    label: "Reading",
    href: "/reading/user",
    children: [
      {
        label: "A1 Elementary",
        href: "/reading/elementary",
        children: [],
      },
      {
        label: "A2 Pre Intermediate",
        href: "/reading/pre-intermediate",
        children: [],
      },
      {
        label: "B1 Intermediate",
        href: "/reading/intermediate",
        children: [],
      },
      {
        label: "B1+ Upper Intermediate",
        href: "/reading/upper-intermediate",
        children: [],
      },
      {
        label: "B2 Pre Advanced",
        href: "/reading/pre-advanced",
        children: [],
      },
    ],
  },
  {
    label: "Speaking",
    href: "/speaking/user",
    children: [
      {
        label: "A1 Elementary",
        href: "/speaking/elementary",
        children: [],
      },
      {
        label: "A2 Pre Intermediate",
        href: "/speaking/pre-intermediate",
        children: [],
      },
      {
        label: "B1 Intermediate",
        href: "/speaking/intermediate",
        children: [],
      },
      {
        label: "B1+ Upper Intermediate",
        href: "/speaking/upper-intermediate",
        children: [],
      },
      {
        label: "B2 Pre Advanced",
        href: "/speaking/pre-advanced",
        children: [],
      },
    ],
  },

  {
    label: "Exam",
    href: "/exam",
    children: [
      {
        label: "Toeic",
        href: "/exam/toeic",
        children: [
        ],
      },
      {
        label: "Ielts",
        href: "/exam/toeic",
        children: [
        ],
      }
    ],
  },
  {
    label: "Custom",
    href: "/custom",
    children: [
    ],
  }
];


function layout({ children }: { children: ReactNode }) {
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <div className="flex items-start gap-6 w-full px-4">
      <nav className="w-[300px]">
        <NavSidebar data={basic} />
      </nav>
      <main className="flex-grow">
        <div className="flex gap-6 items-start w-full">
          <div className="max-w-[600px] w-full">
            <InputAutoComplete
              className=""
              placeholder="Search..."
              onChange={handleSearch}
              suggestions={[]} />
          </div>
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
}

export default layout;
