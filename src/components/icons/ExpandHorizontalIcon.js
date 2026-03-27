import React from "react";
import { IconWrapper } from "./IconWrapper";

export function ExpandHorizontalIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </IconWrapper>
  );
}

ExpandHorizontalIcon.displayName = "ExpandHorizontalIcon";
