import React from "react";
import styles from "./Input.module.css";

export const Input = React.forwardRef(({ type = "text", className, ...props }, ref) => {
  const classNames = [styles.input, className].filter(Boolean).join(" ");
  return (
    <input
      ref={ref}
      type={type}
      className={classNames}
      {...props}
    />
  );
});

Input.displayName = "Input";
