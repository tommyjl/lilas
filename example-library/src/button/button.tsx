import { FC, ButtonHTMLAttributes } from "react";
import { classnames } from "lilas-utils";
import "./button.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button {...props} className={classnames(className, "lilas-button")}>
      {children}
    </button>
  );
};
