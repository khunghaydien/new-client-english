"use client";
import { Badge } from "@/components/ui/badge";
import React, { useCallback, useEffect, useMemo } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { formatDistance } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { Chapter } from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { GET_CHAPTERS } from "@/graphql/query/library";
import { isEmpty, some } from "lodash";
import { TbDatabaseOff } from "react-icons/tb";
import { ListLoading } from "@/components/common/loading";
import InputSearch, { ISearchOutput } from "@/components/ui/input-search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { categorize } from "@/lib/utils";
import { DIFFICULTY_MAPPING } from "@/const/library";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

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

const ChapterList = () => {
  const router = useRouter();
  const pathName = usePathname();
  const type = useMemo(() => pathName.split("/")[2], [pathName]);

  const chapterFilterDto = useMemo(() => {
    const dto: any = {};
    if (type) {
      dto.type = type.toUpperCase();
    }
    return dto;
  }, [type]);

  const handleClick = useCallback(
    (id: string) => {
      router.push(`${pathName}/${id}`);
    },
    [router, pathName]
  );

  const { data, refetch, loading } = useQuery(GET_CHAPTERS, {
    variables: {
      chapterFilterDto,
    },
  });

  const handleSearch = useCallback(
    (search: ISearchOutput) => {
      const updatedFilterDto: any = { ...chapterFilterDto };
      if (search.value) {
        if (!isEmpty(search.value.scope)) {
          updatedFilterDto.difficulty = categorize(
            search.value.scope ?? []
          ).EDIFFICULTY;
          updatedFilterDto.name = search.label;
        } else {
          const description = search.value.description;
          if (description && DIFFICULTY_MAPPING[description]) {
            updatedFilterDto.difficulty = DIFFICULTY_MAPPING[description];
          }
        }
      } else {
        updatedFilterDto.difficulty = "";
        updatedFilterDto.name = search.label;
      }
      refetch({ chapterFilterDto: updatedFilterDto });
    },
    [chapterFilterDto, refetch]
  );

  const { currentPage, pageSize, totalElements, totalPages } = useMemo(() => {
    return data?.getChapters?.metadata;
  }, [data]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 items-start w-full">
        <div className="max-w-[600px] w-full">
          <InputSearch
            scope={type ? [type.toUpperCase()] : undefined}
            onSearch={handleSearch}
          />
        </div>
      </div>
      <ScrollArea style={{ height: "calc(100vh - 250px)" }}>
        <div className="flex flex-col gap-3 pr-6">
          {loading ? (
            <ListLoading height={100} quantity={5} direction="vertical" />
          ) : (
            <>
              {isEmpty(data?.getChapters?.chapters) && <NoData />}
              {data?.getChapters?.chapters?.map(
                (chapter: Chapter, index: number) => (
                  <ChapterCard
                    key={index}
                    chapter={chapter}
                    onClick={handleClick}
                  />
                )
              )}
            </>
          )}
        </div>
      </ScrollArea>

      <div></div>

      <Pagination className="flex justify-end pr-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem>
              <Button variant={currentPage === index + 1 ? "default" : "ghost"}>
                {index + 1}
              </Button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ChapterList;
