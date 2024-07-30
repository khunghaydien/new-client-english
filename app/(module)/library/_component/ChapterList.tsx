"use client";
import { Badge } from "@/components/ui/badge";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { formatDistance } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
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
import { DIFFICULTY_MAPPING } from "@/const/library.const";
import { categorize } from "@/lib/utils";
import { ChapterState, IChapter } from "@/interfaces/library.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/stores";
import { getChapters, selectChapter } from "@/reducers/library/chapter.reducer";

interface IChapterCard {
  chapter: IChapter;
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
            {!isEmpty(type) &&
              type &&
              type.map((item, index) => (
                <Badge key={index} variant={"outline"}>
                  {item}
                </Badge>
              ))}
            {<Badge variant={"outline"}>{difficulty}</Badge>}
          </div>
          <div className="flex flex-center justify-between text-sm">
            {formatDistance(new Date(createdAt ?? ""), new Date(), {
              addSuffix: true,
            })}
            {status === "PUBLISHED" && (
              <div className="flex items-center gap-2">
                <LuView className="" />
                <span>{viewed?.toLocaleString()}</span>
                <FaWpforms className="" />
                <span>{viewed?.toLocaleString()}</span>
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
  const dispatch = useDispatch<AppDispatch>();
  const chapterState: ChapterState = useSelector(selectChapter);
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleChapters = async () => {
    try {
      setLoading(true);
      dispatch(getChapters())
        .unwrap()
        .finally(() => {
          setLoading(false);
        });
    } catch {}
  };

  useEffect(() => {
    handleChapters();
  }, []);

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
      // refetch({ chapterFilterDto: updatedFilterDto });
    },
    [chapterFilterDto]
  );

  const pagination = useMemo(() => {
    return chapterState?.pagination;
  }, [chapterState]);

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
              {isEmpty(chapterState?.chapters) && <NoData />}
              {chapterState?.chapters?.map(
                (chapter: IChapter, index: number) => (
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
          {pagination?.currentPage &&
            pagination?.pageSize &&
            pagination?.totalElement && (
              <PaginationItem>
                {`${
                  (pagination?.currentPage - 1) * pagination?.pageSize + 1
                } - ${Math.min(
                  pagination?.currentPage * pagination?.pageSize,
                  pagination?.totalElement
                )} of ${pagination?.totalElement}`}
              </PaginationItem>
            )}
        </PaginationContent>

        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {Array.from({ length: pagination?.totalPages ?? 0 }).map(
            (_, index) => (
              <PaginationItem key={index}>
                <Button
                  variant={
                    pagination?.currentPage === index + 1 ? "default" : "ghost"
                  }
                >
                  {index + 1}
                </Button>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ChapterList;
