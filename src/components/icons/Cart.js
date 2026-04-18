import React from "react";
import { IconWrapper } from "./IconWrapper";

export function Cart({ color = "var(--background)", className, size = 20 }) {
  return (
    <IconWrapper className={className}>
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H7.5" />
        <circle cx="10" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </svg>
    </IconWrapper>
  );
}

Cart.displayName = "Cart";
