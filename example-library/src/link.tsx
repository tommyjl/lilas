import React from "react";

export function Link({ children, ...props }) {
  return <a {...props}>{children}</a>;
}

