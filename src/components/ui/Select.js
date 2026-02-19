import React from "react";
import styles from "./Select.module.css";

function normalizeOptions(options) {
  if (Array.isArray(options)) return options;
  if (options != null && typeof options === "object") {
    return Object.entries(options).map(([value, label]) => ({ value, label }));
  }
  return [];
}

export const Select = ({ options = [], id, name, value, onChange, className, ...rest }, ref) => {
  const items = normalizeOptions(options);
  const classNames = [styles.select, className].filter(Boolean).join(" ");
  return (
    <select
      ref={ref}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={classNames}
      {...rest}
    >
      {items.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

Select.displayName = "Select";
