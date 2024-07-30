import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Input } from "../ui/input";
import { cn, getTextEllipsis, useClickOutside } from "@/lib/utils";
import _ from "lodash";

export interface Suggestion {
  value: string;
  label: string;
}
export interface IInputAutoComplete {
  className?: string;
  placeholder?: string;
  suggestions: Suggestion[];
  onChange: (value: string) => void;
  setWriting: Dispatch<SetStateAction<boolean>>;
}
const InputAutoComplete = ({
  suggestions,
  className,
  placeholder,
  onChange,
  setWriting,
}: IInputAutoComplete) => {
  const inputAutoCompleteRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    []
  );
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debounceInput = _.debounce((value: string) => {
    onChange(value);
    setWriting(false);
  }, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWriting(true);
    debounceInput(value);
    setInputValue(value);
    if (value) {
      const tmpFiltered = suggestions.filter((suggestion) =>
        suggestion.label.toLowerCase().includes(value.toLowerCase())
      );
      const filtered = Array.from(
        new Set(
          tmpFiltered.map((tmpItem) => `${tmpItem.value}-${tmpItem.label}`)
        )
      )
        .map((item) => {
          const [value, label] = item.split("-");
          return { value, label };
        })
        .splice(0, 10);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestionIndex(-1);
  };

  const handleClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.label);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter") {
      if (
        activeSuggestionIndex >= 0 &&
        activeSuggestionIndex < filteredSuggestions.length
      ) {
        handleClick(filteredSuggestions[activeSuggestionIndex]);
      } else {
        setShowSuggestions(false);
      }
    } else if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useClickOutside(inputAutoCompleteRef, () => {
    setShowSuggestions(false);
  });
  return (
    <div className="relative w-full" ref={inputAutoCompleteRef}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(className, "w-full")}
        placeholder={placeholder}
        ref={inputRef}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="animate-in fade-in-0 zoom-in-95 absolute top-10 z-10 w-full rounded-lg outline-none bg-white dark:bg-black border">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion.value}
              onClick={() => handleClick(suggestion)}
              className={`p-1 rounded-sm ${
                index === activeSuggestionIndex ? "bg-muted" : ""
              }`}
            >
              {getTextEllipsis(suggestion.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputAutoComplete;
