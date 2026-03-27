import React from "react";
import { IconWrapper } from "./IconWrapper";

export function SalesIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20h16" />
        <path d="M7 16V9" />
        <path d="M12 16V5" />
        <path d="M17 16v-3" />
      </svg>
    </IconWrapper>
  );
}

SalesIcon.displayName = "SalesIcon";
