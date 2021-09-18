import { FC, ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
}
