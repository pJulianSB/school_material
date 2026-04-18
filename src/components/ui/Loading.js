import React from "react";
import styles from "./Loading.module.css";

export const Loading = ({
  label = "",
  color = "var(--color-primary-light3)",
  size = 28,
  className,
  spinnerClassName,
  labelClassName,
  ...props
}) => {
  const wrapperClassNames = [styles.wrapper, className].filter(Boolean).join(" ");
  const spinnerClassNames = [styles.spinnerSvg, spinnerClassName].filter(Boolean).join(" ");
  const textClassNames = [styles.label, labelClassName].filter(Boolean).join(" ");

  const numericSize = Number.isFinite(Number(size)) ? Number(size) : 28;

  return (
    <div className={wrapperClassNames} role="status" aria-live="polite" {...props}>
      <svg
        className={spinnerClassNames}
        viewBox="0 0 50 50"
        width={numericSize}
        height={numericSize}
        aria-hidden="true"
        >
        <circle
          className={styles.spinnerCircle}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90 150"
          strokeDashoffset="0"
        />
      </svg>
      {label ? <span className={textClassNames}>{label}</span> : null}
    </div>
  );
};

Loading.displayName = "Loading";
