import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "../ui/input";
import { cn, getTextEllipsis, useClickOutside } from "@/lib/utils";
import _ from "lodash";
import { RiArrowDropDownLine } from "react-icons/ri";

export interface Option {
  value: string;
  label: string;
}
export interface ISelectSingleAutoComplete {
  className?: string;
  placeholder?: string;
  options: Option[];
  selected?: Option;
  onSelect: (option: Option) => void;
}
const SelectSingleAutoComplete = ({
  options,
  className,
  placeholder,
  selected,
  onSelect,
}: ISelectSingleAutoComplete) => {
  const [inputValue, setInputValue] = useState<string>(selected?.label || "");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(-1);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setFilteredOptions(options);
    }
    setActiveOptionIndex(-1);
  };

  const handleSelect = (option: Option) => {
    setInputValue(option.label);
    onSelect(option);
    setFilteredOptions([]);
    setShowOptions(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setActiveOptionIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setActiveOptionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter") {
      if (
        activeOptionIndex >= 0 &&
        activeOptionIndex < filteredOptions.length
      ) {
        handleSelect(filteredOptions[activeOptionIndex]);
      } else {
        handleBlur();
      }
    } else if (event.key === "Escape") {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useClickOutside(selectRef, () => {
    handleBlur();
  });

  const handleBlur = useCallback(() => {
    setShowOptions(false);
    if (selected) setInputValue(selected?.label);
  }, [selected]);

  const handleClick = () => {
    if (selected) setFilteredOptions(options);
    setShowOptions(true);
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        className={cn(className, "pr-4 w-full")}
        placeholder={placeholder}
        ref={inputRef}
      />
      <RiArrowDropDownLine
        className={`absolute right-0 top-[10px] transition-transform duration-300 ${
          showOptions ? "rotate-180" : ""
        }`}
      />
      {showOptions && filteredOptions.length > 0 && (
        <div className="animate-in fade-in-0 zoom-in-95 absolute top-10 w-full rounded-lg outline-none bg-white dark:bg-black border">
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`p-1 rounded-sm hover:bg-muted cursor-pointer ${
                index === activeOptionIndex ? "bg-muted" : ""
              }`}
            >
              {getTextEllipsis(option.label)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectSingleAutoComplete;
