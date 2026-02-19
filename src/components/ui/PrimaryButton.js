import React from "react";
import styles from "./PrimaryButton.module.css";

export const PrimaryButton = ({ children, type = "button", className, ...props }, ref) => {
  const classNames = [styles.primaryButton, className].filter(Boolean).join(" ");
  return (
    <button ref={ref} type={type} className={classNames} {...props}>
      {children}
    </button>
  );
};

PrimaryButton.displayName = "PrimaryButton";
