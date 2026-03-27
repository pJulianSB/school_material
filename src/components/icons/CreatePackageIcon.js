import React from "react";
import { IconWrapper } from "./IconWrapper";

export function CreatePackageIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h10l4 4v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
        <path d="M15 6v4h4" />
        <path d="M9 14h6" />
        <path d="M12 11v6" />
      </svg>
    </IconWrapper>
  );
}

CreatePackageIcon.displayName = "CreatePackageIcon";
