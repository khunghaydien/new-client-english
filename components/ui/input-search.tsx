import { useCallback, useRef, useState } from "react";
import { Input } from "./input";
import { isEmpty } from "lodash";
import { ImSpinner2 } from "react-icons/im";
import { useClickOutside } from "@/lib/utils";
import { debounce } from "lodash";
import { FaBan } from "react-icons/fa";
import clsx from "clsx";
import { ISearch } from "@/interfaces";
import { INPUT_TIME_DELAY } from "@/const";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/stores";
import { getSearch, selectSearch } from "@/reducers/search.reducer";

export interface ISearchOutput {
  value?: ISearch | null;
  label?: string;
}

interface IInputSearch {
  scope?: String[];
  onSearch: (search: ISearchOutput) => void;
  className?: string;
}

const InputSearch = ({ scope, onSearch, className }: IInputSearch) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputSearchRef = useRef<HTMLDivElement>(null);
  const [showSearchEngine, setShowSearchEngine] = useState(false);
  const { data } = useSelector(selectSearch);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [search, setSearch] = useState<ISearchOutput>({});
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = async () => {
    try {
      setLoading(true);
      dispatch(getSearch())
        .unwrap()
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {}
  };
  const debounceInput = debounce((value: string) => {
    setActiveIndex(-1);
    setShowSearchEngine(true);
    handleSearch();
  }, INPUT_TIME_DELAY);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ value: null, label: event.target.value });
    debounceInput(event.target.value);
  };

  const formatLabel = (name: string, scope: string[], description: string) => {
    return (
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            {name}
            {!isEmpty(scope) && (
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
            )}
          </div>
          {description && <div className="text-xs">{description}</div>}
        </div>
        {isEmpty(scope) && <FaBan className="text-destructive" />}
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
        prevIndex < data?.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter") {
      if (showSearchEngine) {
        if (activeIndex >= 0 && activeIndex < data?.length) {
          handleClickSearchEngine(data?.[activeIndex]);
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
        value={search.label}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={"w-full  bg-muted h-[40px]"}
        placeholder={"Search..."}
        ref={inputRef}
      />
      {showSearchEngine && !isEmpty(data) && (
        <ul className="animate-in fade-in-0 zoom-in-95 absolute top-10 z-10 w-full rounded-lg outline-none bg-muted p-2 shadow-lg border-b-2 border-primary">
          {loading ? (
            <div className="flex items-center justify-center">
              <ImSpinner2 className="animate-spin w-8 h-8 text-primary" />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {data.map((search: ISearch, index: number) => (
                <li
                  key={search.id}
                  onClick={() => handleClickSearchEngine(search)}
                  className={`cursor-pointer hover:bg-background px-3 py-1 rounded-lg  ${
                    index === activeIndex ? "bg-background" : ""
                  }`}
                >
                  {formatLabel(
                    search.name,
                    search.scope ?? [],
                    search.description ?? ""
                  )}
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
