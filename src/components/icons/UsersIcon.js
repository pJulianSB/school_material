import React from "react";
import { IconWrapper } from "./IconWrapper";

export function UsersIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 18a5.5 5.5 0 0 1 11 0" />
        <circle cx="17" cy="9" r="2" />
        <path d="M15 18a4 4 0 0 1 6 0" />
      </svg>
    </IconWrapper>
  );
}

UsersIcon.displayName = "UsersIcon";
