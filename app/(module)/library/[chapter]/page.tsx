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
import { ListLoading } from "@/components/common/loading";

interface IChapterCard {
  chapter: Chapter;
  onClick: (id: string) => void;
}

const ChapterCard = ({ chapter, onClick }: IChapterCard) => {
  const { id, name, description, type, createdAt, viewed, status, difficulty } =
    chapter;
  return (
    <div
      className={"cursor-pointer p-3 rounded-lg bg-muted hover:bg-primary/10"}
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
            {<Badge variant={"outline"}>{difficulty}</Badge>}
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

const NoData = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-[500px] gap-10 items-center justify-center text-muted-foreground font-bold">
      <TbDatabaseOff className="w-20 h-20 " />
      <p> No Data</p>
    </div>
  );
};

const PageComponent = ({ params }: { params: Params }) => {
  const { chapter } = params;
  const router = useRouter();
  const pathName = usePathname();
  const [writing, setWriting] = useState(false);
  const handleClick = (id: string) => {
    router.push(`${pathName}/${id}`);
  };
  const { data, refetch, loading } = useQuery(GET_CHAPTERS, {
    variables: {
      chapterFilterDto: {
        type: chapter.toUpperCase(),
      },
    },
  });
  const handleSearch = (value: string) => {
    refetch({
      chapterFilterDto: {
        type: chapter.toUpperCase(),
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
          <ListLoading height={100} quantity={5} direction="vertical" />
        ) : (
          <>
            {isEmpty(data?.getChapters) && <NoData />}
            {data?.getChapters?.map((chapter: Chapter, index: number) => (
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
};

export default PageComponent;
