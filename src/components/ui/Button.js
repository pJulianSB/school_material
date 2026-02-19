import React from "react";

export const Button = ({ children, type = "button", variant = "primary", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        data-variant={variant}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }

Button.displayName = "Button";

