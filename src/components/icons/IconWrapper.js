import React from "react";

export function IconWrapper({ children, className }) {
  return (
    <span className={className} aria-hidden="true">
      {children}
    </span>
  );
}

IconWrapper.displayName = "IconWrapper";
