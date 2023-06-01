import clsx from "clsx";
import { PropsWithChildren, useCallback } from "react";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

type Props = {
  isLoading?: boolean;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  className,
  href,
  onClick,
  ...rest
}) => {
  const router = useRouter();

  const navigate = useCallback(() => {
    router.push(href || "#");
  }, [router, href]);

  return (
    <button
      className={clsx(
        className,
        "rounded-full py-[14px] px-11 bg-[#5C8AED] font-semibold text-white",
        "hover:bg-[#4C7ED6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:ring-none focus:outline-none"
      )}
      disabled={isLoading}
      onClick={onClick || navigate}
      {...rest}
    >
      {isLoading && <Loading className="inline-block w-4 h-4 mr-2 -mt-1" />}
      {children}
    </button>
  );
};

export default Button;
