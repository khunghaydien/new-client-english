import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useMemo,
} from "react";
import { Input, InputProps } from "./input";
import {
  cn,
  getTextEllipsis,
  useClickOutside,
  useDistanceToBottom,
} from "@/lib/utils";
import _ from "lodash";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ScrollArea } from "./scroll-area";

export interface Option {
  value: string;
  label: string;
}
export interface ISingleSelect extends InputProps {
  options: Option[];
  selected?: Option;
  handleSelect: (option: Option) => void;
}
const SingleSelect = forwardRef<HTMLInputElement, ISingleSelect>(
  (
    {
      label,
      disabled,
      required,
      error,
      errorMessage,
      placeholder,
      className,
      options,
      selected,
      handleSelect,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>(selected?.label || "");
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const [activeOptionIndex, setActiveOptionIndex] = useState<number>(-1);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    const distanceToBottom = useDistanceToBottom(selectRef);
    useEffect(() => {
      setActiveOptionIndex(
        filteredOptions.findIndex(({ value }) => value === selected?.value)
      );
    }, [selected, filteredOptions]);

    const heightOptions = useMemo(() => {
      const optionsLength =
        filteredOptions.length > 10 ? 10 : filteredOptions.length;
      return optionsLength * 44;
    }, [filteredOptions]);

    const shouldDisplayAbove = useMemo(() => {
      const optionsLength = options.length > 10 ? 10 : options.length;
      return Boolean(distanceToBottom < optionsLength * 50);
    }, [distanceToBottom, options]);

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

    const onSelect = (option: Option) => {
      setInputValue(option.label);
      handleSelect(option);
      setFilteredOptions([]);
      setShowOptions(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveOptionIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveOptionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (
          activeOptionIndex >= 0 &&
          activeOptionIndex < filteredOptions.length
        ) {
          onSelect(filteredOptions[activeOptionIndex]);
        } else {
          handleBlur();
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        setShowOptions(false);
      }
    };

    useClickOutside(selectRef, () => {
      handleBlur();
    });

    const handleBlur = useCallback(() => {
      setShowOptions(false);
      if (selected) setInputValue(selected?.label);
    }, [selected]);

    const handleClick = () => {
      if (selected) setFilteredOptions(options);
      setShowOptions((prev) => !prev);
    };

    return (
      <div ref={ref}>
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
            error={error}
            errorMessage={errorMessage}
            label={label}
            required={required}
            disabled={disabled}
          />
          <RiArrowDropDownLine
            className={`absolute right-0 bottom-[11px] transition-transform duration-300 ${
              showOptions ? "rotate-180" : ""
            } `}
          />
          {showOptions && filteredOptions.length > 0 && (
            <div
              className={`flex flex-col gap-1 animate-in fade-in-0 zoom-in-95 absolute z-10 w-full rounded-lg outline-none bg-gray-100 dark:bg-gray-900 p-2 shadow-lg ${
                shouldDisplayAbove ? "bottom-10 mb-1" : "top-full mt-1"
              }`}
            >
              <ScrollArea style={{ height: `${heightOptions}px` }}>
                <div className="flex flex-col gap-1">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      onClick={() => onSelect(option)}
                      className={`cursor-pointer hover:bg-muted-foreground/20 h-10 px-2 py-2 rounded-lg ${
                        index === activeOptionIndex
                          ? "bg-muted-foreground/20"
                          : ""
                      }`}
                    >
                      {getTextEllipsis(option.label)}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default SingleSelect;
