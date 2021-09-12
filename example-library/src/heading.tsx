import React from "react";

export function Heading({ children, ...props }) {
  return <h1 {...props}>{children}</h1>;
}

