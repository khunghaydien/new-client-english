"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Chapter, Pagination as IPagination } from "@/gql/graphql";
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
import ChapterItem from "./chapter-item";
import { useChapterStore } from "@/stores/chapterStore";

const pageSizes = [5, 10, 15, 20, 50, 100];

const NoData = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-[500px] gap-10 items-center justify-center text-muted-foreground font-bold">
      <TbDatabaseOff className="w-20 h-20 " />
      <p> No Data</p>
    </div>
  );
};

const ChapterPagination = ({ pagination }: { pagination: IPagination }) => {
  const { pageSize, currentPage, totalPages, totalElements } = pagination;
  const { paginationDto, setPaginationDto } = useChapterStore((state) => state);

  const skip = useMemo(() => {
    if (paginationDto.page && paginationDto.pageSize)
      return (paginationDto.page - 1) * paginationDto.pageSize;
  }, [paginationDto]);

  const onChangePageSize = useCallback((value: number) => {
    let page = 1;
    if (skip) {
      page = Math.floor(skip / value) + 1;
    }
    setPaginationDto({
      pageSize: value,
      page,
    });
  }, []);
  const onChangePage = useCallback((value: number) => {
    setPaginationDto({
      page: value,
    });
  }, []);
  return (
    <>
      <Pagination className="flex justify-end pr-6 gap-6">
        <PaginationContent>
          <PaginationItem>Rows per page:</PaginationItem>
          <PaginationItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                {pageSize}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {pageSizes.map((pageSize, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => onChangePageSize(pageSize)}
                  >
                    {pageSize}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </PaginationItem>
        </PaginationContent>

        <PaginationContent>
          <PaginationItem>
            {`${(currentPage - 1) * pageSize + 1} - ${Math.min(
              currentPage * pageSize,
              totalElements
            )} of ${totalElements}`}
          </PaginationItem>
        </PaginationContent>

        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => onChangePage(currentPage - 1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <Button
                variant={currentPage === index + 1 ? "default" : "ghost"}
                onClick={() => onChangePage(index + 1)}
              >
                {index + 1}
              </Button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => onChangePage(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

const ChapterList = () => {
  const router = useRouter();
  const pathName = usePathname();
  const type = useMemo(() => pathName.split("/")[2], [pathName]);
  const {
    chapterFilterDto,
    paginationDto,
    orderByDto,
    setChapterFilterDto,
    reset,
  } = useChapterStore((state) => state);

  const [pagination, setPagination] = useState<IPagination | null>({
    currentPage: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    reset();
    if (type) {
      setChapterFilterDto({ type: type.toUpperCase() });
    }
  }, [type]);

  const handleClick = useCallback((id: string, type: string) => {
    router.push(`/library/${type.toLocaleLowerCase()}/${id}`);
  }, []);

  const { data, refetch, loading } = useQuery(GET_CHAPTERS, {
    variables: {
      chapterFilterDto,
      paginationDto,
      orderByDto,
    },
    skip: !paginationDto.page || !paginationDto.pageSize,
  });

  useEffect(() => {
    refetch({
      chapterFilterDto,
      paginationDto,
      orderByDto,
    });
  }, [chapterFilterDto, paginationDto, orderByDto]);

  const handleSearch = useCallback((search: ISearchOutput) => {
    reset();
    if (search.value) {
      const { scope, relativeId } = search.value;
      const { type, difficulty, status } = scope;
      if (relativeId) {
        router.push(`/library/${type.toLocaleLowerCase()}/${relativeId}`);
      } else {
        setChapterFilterDto({
          difficulty,
          type,
          status,
        });
      }
    } else {
      setChapterFilterDto({
        difficulty: "",
        type: "",
        status: "",
        name: search.label,
      });
    }
  }, []);

  useEffect(() => {
    setPagination(data?.getChapters?.pagination);
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
          <InputSearch scope={scope} onSearch={handleSearch} target="Chapter" />
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
                  <ChapterItem
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
      {!isEmpty(data?.getChapters?.chapters) && pagination && (
        <ChapterPagination pagination={pagination} />
      )}
    </div>
  );
};

export default ChapterList;
