import { FC, AnchorHTMLAttributes } from "react";
import "./link.css";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: FC<LinkProps> = ({ children, ...props }: LinkProps) => {
  return <a {...props}>{children}</a>;
}

