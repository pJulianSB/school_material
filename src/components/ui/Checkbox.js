import React from "react";
import styles from "./Checkbox.module.css";

export const Checkbox = ({
  id,
  name,
  checked = false,
  onChange,
  label,
  required = false,
  className,
  ...props
}, ref) => {
  const classNames = [styles.checkboxWrapper, className].filter(Boolean).join(" ");
  return (
    <label htmlFor={id} className={classNames}>
      <input
        ref={ref}
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className={styles.checkboxInput}
        {...props}
      />
      <span className={styles.checkboxLabel}>{label}</span>
    </label>
  );
};

Checkbox.displayName = "Checkbox";

