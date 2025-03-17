"use client";

import React, {
  useState,
  KeyboardEventHandler,
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
} from "react";

import { Input } from "@/components/ui/input";

interface TagInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange" | "value"> {
  value: string[];
  onChange: (value: string[]) => void;
}

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onChange, placeholder, ...inputProps }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setInputValue(e.target.value);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        if (inputValue.trim()) {
          onChange([...value, inputValue.trim()]);
          setInputValue("");
        }
      }
    };

    const handleRemoveTag = (index: number) => {
      const newValue = value.filter((_, i) => i !== index);
      onChange(newValue);
    };

    const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
      setIsFocused(true);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
      setIsFocused(false);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-haspopup="listbox"
          aria-expanded={isFocused}
          className="w-full"
          {...inputProps}
        />
        {value.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {value.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  aria-label={`Remove tag ${tag}`}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

TagInput.displayName = "TagInput";

export { TagInput };
export type { TagInputProps };
