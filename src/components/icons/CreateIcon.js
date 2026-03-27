import React from "react";
import { IconWrapper } from "./IconWrapper";

export function CreateIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    </IconWrapper>
  );
}

CreateIcon.displayName = "CreateIcon";
