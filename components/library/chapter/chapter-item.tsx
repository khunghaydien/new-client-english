"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { formatDistance } from "date-fns";
import { Chapter } from "@/gql/graphql";
interface IChapterCard {
  chapter: Chapter;
  onClick: (id: string, type: string) => void;
}

const ChapterItem = ({ chapter, onClick }: IChapterCard) => {
  const { id, name, description, type, createdAt, viewed, status, difficulty } =
    chapter;
  return (
    <div
      className={
        "cursor-pointer p-3 rounded-lg hover:bg-muted-foreground/20 bg-muted-foreground/10 "
      }
      onClick={() => onClick(id, type)}
    >
      <div className="flex gap-3 flex-col">
        <div className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold text-pretty text-lg">{name}</span>
          {status === "PUBLISHED" && (
            <Badge variant={"default"}>Published</Badge>
          )}
          {status === "DRAFT" && <Badge variant={"destructive"}>Draft</Badge>}
          {status === "INCOMPLETED" && (
            <Badge variant={"default"}>INCOMPLETED</Badge>
          )}
        </div>
        <div className="h-[20px] truncate text-sm ">
          {description || "No description"}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={"outline"}>{type}</Badge>
            <Badge variant={"outline"}>{difficulty}</Badge>
          </div>
          <div className="flex flex-center justify-between text-sm">
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
            {status === "PUBLISHED" && (
              <div className="flex items-center gap-2">
                <LuView className="" />
                <span>{viewed.toLocaleString()}</span>
                <FaWpforms className="" />
                <span>{viewed.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChapterItem;
