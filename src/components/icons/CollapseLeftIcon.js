import React from "react";
import { IconWrapper } from "./IconWrapper";

export function CollapseLeftIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </IconWrapper>
  );
}

CollapseLeftIcon.displayName = "CollapseLeftIcon";
