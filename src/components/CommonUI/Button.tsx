import clsx from "clsx";
import { PropsWithChildren } from "react";
import Loading from "./Loading";

type Props = {
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        className,
        "rounded-full py-[14px] px-11 bg-[#5C8AED] font-semibold text-white",
        "hover:bg-[#4C7ED6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:ring-none focus:outline-none"
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading && <Loading className="inline-block w-4 h-4 mr-2 -mt-1" />}
      {children}
    </button>
  );
};

export default Button;
