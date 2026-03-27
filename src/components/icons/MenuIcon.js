import React from "react";
import { IconWrapper } from "./IconWrapper";

export function MenuIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    </IconWrapper>
  );
}

MenuIcon.displayName = "MenuIcon";
