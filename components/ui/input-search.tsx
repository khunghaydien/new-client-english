import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { useQuery } from "@apollo/client";
import { GET_SEARCHS } from "@/graphql/query/search";
import { Search as ISearch } from "@/gql/graphql";
import { isEmpty } from "lodash";
import { ImSpinner2 } from "react-icons/im";
import { getTextEllipsis, useClickOutside } from "@/lib/utils";
import { debounce } from "lodash";
import { INPUT_TIME_DELAY } from "@/const/app";
import { FaBan } from "react-icons/fa";
import clsx from "clsx";

export interface ISearchOutput {
  value?: ISearch | null;
  label?: string;
}

interface IInputSearch {
  target?: string;
  scope?: Record<string, string>;
  onSearch: (search: ISearchOutput) => void;
  className?: string;
}

const InputSearch = ({ scope, onSearch, className, target }: IInputSearch) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputSearchRef = useRef<HTMLDivElement>(null);
  const [showSearchEngine, setShowSearchEngine] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [search, setSearch] = useState<ISearchOutput>({});
  const { data, loading, refetch } = useQuery(GET_SEARCHS, {
    variables: {
      searchFilterDto: {
        target,
        ...(scope &&
          !isEmpty(Object.keys(scope)) && { scope: JSON.stringify(scope) }),
      },
    }
  });

  const debounceInput = useCallback(
    debounce((value: string) => {
      setActiveIndex(-1);
      setShowSearchEngine(true);
      refetch({
        searchFilterDto: {
          target,
          name: value,
          ...(scope &&
            !isEmpty(Object.keys(scope)) && { scope: JSON.stringify(scope) }),
        },
      });
    }, INPUT_TIME_DELAY),
    [refetch]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ value: null, label: event.target.value });
    debounceInput(event.target.value);
  };

  const formatLabel = ({
    name,
    scope,
    target,
    relativeId,
    description,
  }: ISearch) => {
    return (
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {getTextEllipsis(name)}
            {relativeId && (
              <>
                <div>-</div>
                <div className="text-blue-400">
                  {target.toLocaleLowerCase()}.
                  {name.trim().split(" ").join("-")}
                </div>
              </>
            )}
          </div>
          {(!isEmpty(scope) || description) && (
            <div className="text-xs flex flex-wrap gap-2">
              {description && <div>{description}</div>}
              {!isEmpty(scope) && (
                <div className="flex items-center justify-center gap-2">
                  {Object.values(scope as Record<string, string>).map((item: string, index: number) => (
                    <div key={index} className="px-2 rounded-lg bg-primary/20">
                      {item.toLocaleLowerCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {!relativeId && <FaBan className="text-destructive" />}
      </div>
    );
  };

  const handleClickSearchEngine = (search: ISearch) => {
    setSearch({ value: search, label: search.name });
    setShowSearchEngine(false);
    onSearch({ value: search, label: search.name });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < data?.getSearchs?.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter") {
      if (showSearchEngine) {
        if (activeIndex >= 0 && activeIndex < data?.getSearchs?.length) {
          handleClickSearchEngine(data?.getSearchs?.[activeIndex]);
        } else {
          setShowSearchEngine(false);
          onSearch(search);
        }
      } else {
        onSearch(search);
      }
    } else if (event.key === "Escape") {
      setShowSearchEngine(false);
    }
  };

  useClickOutside(inputSearchRef, () => {
    setShowSearchEngine(false);
  });

  return (
    <div className={clsx(className, "relative w-full")} ref={inputSearchRef}>
      <Input
        type="text"
        value={search.label ?? ""}
        onClick={() => setShowSearchEngine(true)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={"w-full  bg-muted h-[40px]"}
        placeholder={"Search..."}
        ref={inputRef}
      />
      {showSearchEngine && !isEmpty(data?.getSearchs) && (
        <ul className="min-w-[500px] animate-in fade-in-0 zoom-in-95 absolute top-11 z-10 w-full rounded-lg outline-none bg-muted p-2 shadow-lg border-b-2 border-primary">
          {loading ? (
            <div className="flex items-center justify-center">
              <ImSpinner2 className="animate-spin w-8 h-8 text-primary" />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {data?.getSearchs.map((search: ISearch, index: number) => (
                <li
                  key={search.id}
                  onClick={() => handleClickSearchEngine(search)}
                  className={`cursor-pointer hover:bg-background px-3 py-1 rounded-lg  ${index === activeIndex ? "bg-background" : ""
                    }`}
                >
                  {formatLabel(search)}
                </li>
              ))}
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default InputSearch;
