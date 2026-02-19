import React from "react";
import styles from "./SecondaryButton.module.css";

export const SecondaryButton = ({ children, type = "button", className, ...props }, ref) => {
  const classNames = [styles.secondaryButton, className].filter(Boolean).join(" ");
  return (
    <button ref={ref} type={type} className={classNames} {...props}>
      {children}
    </button>
  );
};

SecondaryButton.displayName = "SecondaryButton";
