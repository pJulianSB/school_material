import React from "react";
import { IconWrapper } from "./IconWrapper";

export function MaterialIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 4h9l3 3v13H6z" />
        <path d="M15 4v3h3" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </svg>
    </IconWrapper>
  );
}

MaterialIcon.displayName = "MaterialIcon";
