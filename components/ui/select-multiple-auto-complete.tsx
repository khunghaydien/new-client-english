import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn, getTextEllipsis, useClickOutside } from "@/lib/utils";
import _, { isEmpty } from "lodash";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export interface Option {
  value: string;
  label: string;
}
export interface ISelectMultipleAutoComplete {
  className?: string;
  placeholder?: string;
  options: Option[];
  selected?: Option[];
  onSelect: (option: Option[]) => void;
}
const SelectMultipleAutoComplete = ({
  options,
  className,
  placeholder,
  selected = [],
  onSelect,
}: ISelectMultipleAutoComplete) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(-1);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(true);
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
    setInputValue("");
    let tmpSelected = [...selected];
    const isSelected = tmpSelected.some((item) => item.value === option.value);
    if (isSelected) {
      tmpSelected = tmpSelected.filter((item) => item.value !== option.value);
    } else {
      tmpSelected.push(option);
    }
    onSelect(tmpSelected);
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

  const handleBlur = useCallback(() => {
    setShowOptions(false);
    if (selected) setInputValue("");
    setFocus(false);
  }, [selected]);

  const handleClick = () => {
    if (selected) setFilteredOptions(options);
    setShowOptions(true);
  };

  useClickOutside(selectRef, () => {
    handleBlur();
  });

  const handleRemove = (option: Option) => {
    const tmpSeleted = selected.filter((item) => item.value !== option.value);
    onSelect(tmpSeleted);
    inputRef.current?.focus();
    setFocus(true);
  };

  useEffect(() => {
    if (showOptions) {
      inputRef.current?.focus();
      setFocus(true);
    }
  }, [showOptions]);

  return (
    <div className="relative w-full" ref={selectRef}>
      <div
        onClick={handleClick}
        className={`flex gap-1 border w-full rounded-lg flex-wrap items-center min-h-10 pl-2 pr-4 py-1 ${
          focus ? "border-ring" : ""
        }`}
      >
        {isEmpty(selected) && !showOptions && (
          <p className="text-sm">{placeholder}</p>
        )}
        {selected?.map((item) => (
          <div
            key={item.value}
            className="px-2 bg-muted rounded-lg text-sm flex gap-1 items-center py-0.5"
          >
            {item.label}
            <MdClose
              className="hover:bg-destructive hover:text-white rounded-full cursor-pointer"
              onClick={() => handleRemove(item)}
            />
          </div>
        ))}
        {showOptions && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={cn(
              className,
              "focus:outline-none bg-transparent flex-grow"
            )}
          />
        )}
      </div>
      <RiArrowDropDownLine
        className={`absolute right-0 top-[10px] transition-transform duration-300 ${
          showOptions ? "rotate-180" : ""
        }`}
      />
      {showOptions && filteredOptions.length > 0 && (
        <div className="animate-in fade-in-0 zoom-in-95 absolute z-10 w-full rounded-lg outline-none bg-white dark:bg-black border flex flex-col gap-1 p-2">
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-2 py-1 rounded-lg hover:bg-muted text-sm relative ${
                index === activeOptionIndex ? "bg-primary text-white" : ""
              } `}
            >
              {getTextEllipsis(option.label)}
              {selected.some((item) => item.value === option.value) && (
                <FaCheck
                  color="gray"
                  className="absolute right-[5px] top-[8px] text-[10px]"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectMultipleAutoComplete;
