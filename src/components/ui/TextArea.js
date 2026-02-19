import React from "react";
import styles from "./TextArea.module.css";

export const TextArea = ({ rows = 4, className, ...props }, ref) => {
  const classNames = [styles.textArea, className].filter(Boolean).join(" ");
  return <textarea ref={ref} rows={rows} className={classNames} {...props} />;
};

TextArea.displayName = "TextArea";
