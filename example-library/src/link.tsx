import { FC, AnchorHTMLAttributes } from "react";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: FC<LinkProps> = ({ children, ...props }: LinkProps) => {
  return <a {...props}>{children}</a>;
}

