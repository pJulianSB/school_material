import React from "react";
import styles from "./Price.module.css";

export const Price = ({ value, currency = "COP", locale = "es-CO", className, ...props }) => {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  const classNames = [styles.price, className].filter(Boolean).join(" ");
  return (
    <span className={classNames} {...props}>
      {formatted}
    </span>
  );
};

Price.displayName = "Price";
