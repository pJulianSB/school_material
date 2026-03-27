import React from "react";
import { IconWrapper } from "./IconWrapper";

export function LogoutIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
        <path d="M13 8l5 4-5 4" />
        <path d="M18 12H9" />
      </svg>
    </IconWrapper>
  );
}

LogoutIcon.displayName = "LogoutIcon";
