"use client";
import { Badge } from "@/components/ui/badge";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useState } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { formatDistance } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import InputAutoComplete from "@/components/ui/input-auto-complete";
import { Chapter } from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { GET_CHAPTERS } from "@/graphql/query/library";
import { isEmpty } from "lodash";
import { TbDatabaseOff } from "react-icons/tb";
import { Skeleton } from "@/components/ui/skeleton";

interface IChapterCard {
  chapter: Chapter;
  onClick: (id: string) => void;
}

const ChapterCard = ({ chapter, onClick }: IChapterCard) => {
  const { id, name, description, type, createdAt, viewed, status, level } =
    chapter;
  return (
    <div
      className={
        "cursor-pointer bg-primary/20 p-3 rounded-lg hover:bg-primary/30 dark:bg-muted dark:hover:bg-gray-500 dark:hover:text-foreground"
      }
      onClick={() => onClick(id)}
    >
      <div className="flex gap-3 flex-col">
        <div className="flex items-center gap-2 justify-between">
          <span className="truncate font-bole">{name}</span>
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
            {type.map((item, index) => (
              <Badge key={index} variant={"outline"}>
                {item}
              </Badge>
            ))}
            {<Badge variant={"outline"}>{level}</Badge>}
          </div>
          <div className="flex flex-center justify-between text-sm">
            {formatDistance(createdAt, new Date(), {
              addSuffix: true,
            })}
            {status === "published" && (
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
const LoadingChapter = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Skeleton key={index} className="w-full h-[100px] rounded-lg" />
  ));
};
const NoData = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-[500px] gap-10 items-center justify-center text-muted-foreground font-bold">
      <TbDatabaseOff className="w-20 h-20 " />
      <p> No Data</p>
    </div>
  );
};
function page({ params }: { params: Params }) {
  const { type, level } = params;
  const router = useRouter();
  const pathName = usePathname();
  const [writing, setWriting] = useState(false);
  const handleClick = (id: string) => {
    router.push(`${pathName}/${id}`);
  };
  const { data, refetch, loading } = useQuery(GET_CHAPTERS, {
    variables: {
      chapterFilterDto: {
        type: type.toUpperCase(),
        level: level.replace("-", "_").toUpperCase(),
      },
    },
  });
  const handleSearch = (value: string) => {
    refetch({
      chapterFilterDto: {
        type: type.toUpperCase(),
        level: level.replace("-", "_").toUpperCase(),
        name: value,
      },
    });
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 items-start w-full">
        <div className="max-w-[600px] w-full">
          <InputAutoComplete
            setWriting={setWriting}
            className=""
            placeholder="Search..."
            onChange={handleSearch}
            suggestions={[]}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {loading || writing ? (
          <LoadingChapter />
        ) : (
          <>
            {isEmpty(data?.getChapters) && <NoData />}
            {data?.getChapters.map((chapter: Chapter, index: number) => (
              <ChapterCard
                key={index}
                chapter={chapter}
                onClick={handleClick}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default page;
