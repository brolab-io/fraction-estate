import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = {} & React.ButtonHTMLAttributes<HTMLDivElement>;

const Container: React.FC<PropsWithChildren<Props>> = ({ children, className, ...rest }) => {
  return (
    <div className={clsx(className, "max-w-[1289px] mx-auto w-full")} {...rest}>
      {children}
    </div>
  );
};

export default Container;
