import { useMemo, useRef, useState } from "react";
import { Input } from "./input";
import { useQuery } from "@apollo/client";
import { GET_SEARCHS } from "@/graphql/query/search";
import { Search as ISearch } from "@/gql/graphql";
import { isEmpty } from "lodash";
import { ImSpinner2 } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { useClickOutside } from "@/lib/utils";

export interface ISearchOutput {
  value?: ISearch | null;
  label?: string;
}

interface IInputSearch {
  scope: String[];
  onSearch: (search: ISearchOutput) => void;
}

const InputSearch = ({ scope, onSearch }: IInputSearch) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputSearchRef = useRef<HTMLDivElement>(null);
  const [showSearchEngine, setShowSearchEngine] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [search, setSearch] = useState<ISearchOutput>({});
  const { data, loading, refetch } = useQuery(GET_SEARCHS);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ value: null, label: event.target.value });
    setActiveIndex(-1);
    setShowSearchEngine(true);
    refetch({
      searchFilterDto: {
        name: event.target.value,
      },
    });
  };

  const formatLabel = (name: string, scope: string[]) => {
    return (
      <div className="flex items-center gap-4">
        {name}
        <div className="flex items-center justify-center gap-2">
          {scope.map((item: string, index) => (
            <div
              key={index}
              className="px-2 bg-primary/20 rounded-lg hover:bg-primary/30"
            >
              {item.toLocaleLowerCase()}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleClickSearchEngine = (search: ISearch) => {
    setSearch({ value: search, label: search.name });
    setShowSearchEngine(false);
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
        }
      }
      handleSearch();
    } else if (event.key === "Escape") {
      setShowSearchEngine(false);
    }
  };

  useClickOutside(inputSearchRef, () => {
    setShowSearchEngine(false);
  });

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="relative w-full" ref={inputSearchRef}>
      <Input
        type="text"
        value={search.label}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={"w-full pr-8"}
        placeholder={"Search..."}
        ref={inputRef}
      />

      <div className="absolute right-2 top-2.5">
        <FaSearch
          className="font-sm text-primary cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      {showSearchEngine && !isEmpty(data?.getSearchs) && (
        <ul className="animate-in fade-in-0 zoom-in-95 absolute top-10 z-10 w-full rounded-lg outline-none bg-white dark:bg-black border p-2">
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
                  className={`cursor-pointer hover:bg-secondary px-3 py-1 rounded-lg  ${
                    index === activeIndex ? "bg-secondary" : ""
                  }`}
                >
                  {formatLabel(search.name, search.scope)}
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
