"use client";
import React, { ReactNode } from "react";
import { isEmpty } from "lodash";
import { cn, getFirstNSegments } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type INavSidebar = {
  icon?: ReactNode;
  label: string;
  href: string;
  children: INavSidebar[];
};

const NestedAccordion = ({
  data,
  difficulty = 0,
}: {
  data: INavSidebar[];
  difficulty: number;
}) => {
  const pathname = usePathname();
  return (
    <Accordion
      type="single"
      collapsible
      className={"gap-2 flex flex-col"}
      style={{ marginLeft: `${difficulty * 16}px` }}
      defaultValue={getFirstNSegments(pathname)}
    >
      {data.map(({ label, href, children, icon }, index) => {
        return (
          <AccordionItem
            key={index}
            value={href}
            className={"gap-2 flex flex-col"}
          >
            {isEmpty(children) && (
              <Link
                className={`rounded-lg  py-3 px-2 hover:bg-muted cursor-pointer text-sm font-bold flex gap-3 items-center ${
                  pathname.includes(href)
                    ? "bg-primary hover:bg-primary text-white"
                    : ""
                }`}
                href={href}
              >
                {icon}
                {label}
              </Link>
            )}
            {!isEmpty(children) && (
              <>
                <AccordionTrigger className="rounded-lg py-3 px-2 hover:bg-muted data-[state=open]:bg-secondary text-sm font-bold">
                  {label}
                </AccordionTrigger>
                <AccordionContent>
                  <NestedAccordion
                    data={children}
                    difficulty={difficulty + 1}
                  />
                </AccordionContent>
              </>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

function NavSidebar({ data }: { data: INavSidebar[] }) {
  return <NestedAccordion data={data} difficulty={0} />;
}

export default NavSidebar;
