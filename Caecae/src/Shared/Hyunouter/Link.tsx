import React, { ReactNode, useContext, MouseEvent } from "react";
import { RouterContext } from "./Router";

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ to, children, className }) => {
  const { changePath } = useContext(RouterContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    changePath(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default Link;
