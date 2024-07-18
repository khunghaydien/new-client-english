"use client";
import { Badge } from "@/components/ui/badge";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { formatDistance } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import InputAutoComplete from "@/components/ui/input-auto-complete";

export interface IChapterCard {
  id: string;
  type: "published" | "draft" | "incompleted";
  createdAt: Date;
  visited: number;
  submitted: number;
  description: string;
  name: string;
  onClick: (id: string) => void;
}

const ChapterCard = ({
  id,
  type,
  createdAt,
  visited,
  submitted,
  description,
  name,
  onClick,
}: IChapterCard) => {
  return (
    <div
      className={
        "cursor-pointer bg-primary/20 p-3 rounded-lg hover:bg-primary/50 hover:text-muted dark:bg-muted dark:hover:bg-primary/50 dark:hover:text-foreground"
      }
      onClick={() => onClick(id)}
    >
      <div>
        <div className="flex items-center gap-2 justify-between">
          <span className="truncate font-bole">{name}</span>
          {type === "published" && <Badge>Published</Badge>}
          {type === "draft" && <Badge variant={"destructive"}>Draft</Badge>}
        </div>
        <div className="flex flex-center justify-between text-sm">
          {formatDistance(createdAt, new Date(), {
            addSuffix: true,
          })}
          {type === "published" && (
            <div className="flex items-center gap-2">
              <LuView className="" />
              <span>{visited.toLocaleString()}</span>
              <FaWpforms className="" />
              <span>{submitted.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
      <div className="h-[20px] truncate text-sm ">
        {description || "No description"}
      </div>
    </div>
  );
};

function page(_context: { params: Params }) {
  const router = useRouter();
  const pathName = usePathname();
  const handleClick = (id: string) => {
    router.push(`${pathName}/${id}`);
  };
  const handleSearch = () => {};
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 items-start w-full">
        <div className="max-w-[600px] w-full">
          <InputAutoComplete
            className=""
            placeholder="Search..."
            onChange={handleSearch}
            suggestions={[]}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <ChapterCard
            key={index}
            id={index.toString()}
            type={"published"}
            createdAt={new Date()}
            visited={0}
            submitted={0}
            description={"sss"}
            name={"sss"}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

export default page;
