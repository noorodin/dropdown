import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./Dropdown.scss";
import { OPTIONS } from "./constant";
import { Option } from "./types";

function Dropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState<Option[]>(OPTIONS);
  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && inputRef.current) {
      const inputValue = inputRef.current.value.trim();

      if (inputValue) {
        setOptions((prev) => [
          {
            key: inputValue,
            value: inputValue,
          },
          ...prev,
        ]);

        inputRef.current.value = "";
      }
    }
  };

  return (
    <section ref={dropdownRef} className="dropdown">
      <input
        ref={inputRef}
        className="dropdown__input"
        type="text"
        onKeyDown={handlePressEnter}
        onFocus={() => setFocused(true)}
      />
      {focused && options.length > 0 && (
        <div className="dropdown__options-wrapper">
          <div className="dropdown__options">
            {options.map(({ key, value }: Option) => (
              <label key={key} className="dropdown__option">
                {value}
                <input
                  className="dropdown__checkbox"
                  type="checkbox"
                  value={value}
                />
                <span className="dropdown__tick" />
              </label>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Dropdown;
