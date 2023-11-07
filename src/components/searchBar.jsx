import { useState } from "react";
import searchIcon from "../assets/Search.svg";

export default function SearchBar(props) {
  const { placeholder, datalist } = props;
  const { onChange = () => {}, setSelect = () => {} } = props;

  const [value, setValue] = useState("");
  const [isFocused, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleType = (e) => {
    const value = e.target.value;
    setValue(value);
    onChange(value);
  };

  const handleSelect = (value) => (e) => {
    if (e.type !== "click" && e.keyCode !== 13) return;
    setValue("");
    setSelect(value);

    handleBlur();
  };

  return (
    <div className="search-bar" onFocus={handleFocus}>
      <label>
        <img className="icon" src={searchIcon} alt="" />
        <input
          id="search"
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleType}
        />
      </label>

      {datalist && isFocused && (
        <div className="suggest-list">
          {datalist.map(({ id, image, description }) => (
            <div
              id={id}
              key={id}
              className="list"
              tabIndex={isFocused ? 0 : -1}
              onKeyUp={handleSelect(id)}
              onClick={handleSelect(id)}
            >
              <img src={image} alt="" />

              <div>
                <span>@{id}</span>

                {description ? (
                  <p className="fs-small">{description}</p>
                ) : (
                  <p className="placeholder-alert">No description</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
