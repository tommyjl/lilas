import { FC, HTMLAttributes } from "react";
import "./heading.css";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export const Heading: FC<HeadingProps> = ({ children, ...props }) => {
  return <h1 {...props}>{children}</h1>;
}

