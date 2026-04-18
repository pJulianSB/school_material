import React from "react";
import { IconWrapper } from "./IconWrapper";

export function CheckIcon({ className, color = "currentColor", size = 20 }) {
  return (
    <IconWrapper className={className}>
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 7 10 17l-5-5" />
      </svg>
    </IconWrapper>
  );
}

CheckIcon.displayName = "CheckIcon";
