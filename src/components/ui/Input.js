import React from "react";

export const Input = ({ type = "text", className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={className}
        {...props}
      />
    );
  }

Input.displayName = "Input";

