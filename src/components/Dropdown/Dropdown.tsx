import { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";
import { OPTIONS } from "./constant";

function Dropdown() {
  const dropdownRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const [options, setOptions] = useState<any>(OPTIONS);
  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as any)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePressEnter = (e: any) => {
    if (e.code === "Enter") {
      setOptions((prev: any) => [
        {
          key: e.target.value.toLowerCase(),
          value: e.target.value,
        },
        ...prev,
      ]);

      setTimeout(() => {
        inputRef.current.value = "";
      }, 0);
    }
  };

  return (
    <div ref={dropdownRef} className="dropdown">
      <input
        ref={inputRef}
        className="dropdown__input"
        type="text"
        id="dropdown"
        name="dropdown"
        onKeyDown={handlePressEnter}
        onFocus={() => setFocused(true)}
      />
      {focused && options?.length ? (
        <section className="dropdown__options">
          {options?.map((option: any) => {
            const { key, value } = option;

            return (
              <label key={key} className="dropdown__option">
                {value}
                <input type="checkbox" value={value} />
              </label>
            );
          })}
        </section>
      ) : null}
    </div>
  );
}

export default Dropdown;
