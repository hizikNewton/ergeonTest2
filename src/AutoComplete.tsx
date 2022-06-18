import react, { ChangeEvent, CSSProperties, FC, useRef, useState } from "react";
import useOnClickOutside from "./hooks/useOnClickOutside";

export interface IData {
  zip_code: number | string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface autoCompleteProps {
  inputStyle?: react.CSSProperties;
  optionsStyle?: react.CSSProperties;
  data: any[];
}

const containerStyle: CSSProperties = {
  background: "#fff",
  padding: "8px 0",
  listStyleType: " none",
  width: "320px",
  border: "1px solid #b6c1ce",
  borderRadius: "2px",
  margin: "0",
  boxSizing: "border-box",
  maxHeight: "280px",
  overflowY: "auto",
  zIndex: 1,
};

const itemListStyle: CSSProperties = {
  padding: "0 24px",
  width: "100%",
  boxSizing: "border-box",
};

const autoCompleteRootStyle: CSSProperties = {
  position: "relative",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
};

const itemStyle: CSSProperties = {
  lineHeight: "32px",
  width: "100%",
};

const inputStyle = {
  backgroundColor: "PaleTurquoise",
  width: "302px",
  padding: "8px",
};

export const AutoComplete: FC<autoCompleteProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement | any>();
  const [search, setSearch] = useState<{
    text: string | number;
    suggestions: Array<any>;
    error?: string;
  }>({
    text: "",
    suggestions: [],
    error: "",
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  useOnClickOutside(ref, () => setIsComponentVisible(false));

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let suggestions = [];
    let error = "";
    const isNumber = new RegExp(/^\d+$/).test(value);
    if (value && isNumber) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = data
        .sort()
        .filter((v: IData) => regex.test(`${v.zip_code}`));
    } else if (value && !isNumber) {
      error = "Input must only be number";
    }
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value, error });
  };

  const suggestionSelected = (value: IData) => {
    setSearch({
      text: value.zip_code,
      suggestions: [],
    });
    setIsComponentVisible(false);
  };

  const { suggestions, error } = search;

  return (
    <div style={autoCompleteRootStyle} ref={ref}>
      <div>
        <label
          style={{ display: "block", paddingBlock: "8px", textAlign: "start" }}
        >
          {"America zip code"}
        </label>
        <input
          id="input"
          autoComplete="off"
          value={search.text}
          onChange={onTextChanged}
          type={"text"}
          style={inputStyle}
        />
      </div>
      {error && <p>{error}</p>}
      {suggestions.length > 0 && isComponentVisible && (
        <ul style={containerStyle}>
          {suggestions.map((item: IData) => (
            <li key={item.zip_code} style={itemListStyle}>
              <button
                style={itemStyle}
                className="base__button"
                key={item.zip_code}
                onClick={() => suggestionSelected(item)}
              >
                {item.zip_code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
