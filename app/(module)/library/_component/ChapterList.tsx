"use client";
import { Badge } from "@/components/ui/badge";
import React, { useCallback, useMemo } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { formatDistance } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { Chapter } from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { GET_CHAPTERS } from "@/graphql/query/library";
import { isEmpty } from "lodash";
import { TbDatabaseOff } from "react-icons/tb";
import { ListLoading } from "@/components/common/loading";
import InputSearch, { ISearchOutput } from "@/components/ui/input-search";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IChapterCard {
  chapter: Chapter;
  onClick: (id: string) => void;
}

const ChapterCard = ({ chapter, onClick }: IChapterCard) => {
  const { id, name, description, type, createdAt, viewed, status, difficulty } =
    chapter;
  return (
    <div
      className={
        "cursor-pointer p-3 rounded-lg hover:border-primary bg-muted border-b-2 border-muted"
      }
      onClick={() => onClick(id)}
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
        const { scope, relativeId } = search.value;
        const { type, difficulty, status } = scope;
        if (relativeId) {
          router.push(`${pathName}/${relativeId}`);
        } else {
          updatedFilterDto.difficulty = difficulty;
          updatedFilterDto.type = type;
          updatedFilterDto.status = status;
          refetch({ chapterFilterDto: updatedFilterDto });
        }
      } else {
        updatedFilterDto.difficulty = "";
        updatedFilterDto.type = "";
        updatedFilterDto.status = "";
        updatedFilterDto.name = search.label;
        refetch({ chapterFilterDto: updatedFilterDto });
      }
    },
    [chapterFilterDto, refetch]
  );

  const pagination = useMemo(() => {
    return data?.getChapters?.metadata;
  }, [data]);

  const scope = useMemo(() => {
    return {
      type: type?.toLocaleUpperCase() ?? "",
    };
  }, [type]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 items-start w-full">
        <div className="max-w-[600px] w-full">
          <InputSearch scope={scope} onSearch={handleSearch} />
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
      {!isEmpty(data?.getChapters?.chapters) && (
        <Pagination className="flex justify-end pr-6 gap-6">
          <PaginationContent>
            <PaginationItem>Rows per page:</PaginationItem>
            <PaginationItem>
              <DropdownMenu>
                <DropdownMenuTrigger>{10}</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => {}}>5</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>10</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>15</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </PaginationItem>
          </PaginationContent>

          <PaginationContent>
            <PaginationItem>
              {`${
                (pagination?.currentPage - 1) * pagination?.pageSize + 1
              } - ${Math.min(
                pagination?.currentPage * pagination?.pageSize,
                pagination?.totalElements
              )} of ${pagination?.totalElements}`}
            </PaginationItem>
          </PaginationContent>

          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {Array.from({ length: pagination?.totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <Button
                  variant={
                    pagination?.currentPage === index + 1 ? "default" : "ghost"
                  }
                >
                  {index + 1}
                </Button>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ChapterList;
