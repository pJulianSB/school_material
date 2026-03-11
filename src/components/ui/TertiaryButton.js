import React from "react";
import styles from "./TertiaryButton.module.css";

export const TertiaryButton = ({ children, type = "button", className, ...props }, ref) => {
  const classNames = [styles.tertiaryButton, className].filter(Boolean).join(" ");
  return (
    <button ref={ref} type={type} className={classNames} {...props}>
      {children}
    </button>
  );
};

TertiaryButton.displayName = "TertiaryButton";
