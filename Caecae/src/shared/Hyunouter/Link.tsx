import React, { ReactNode, useContext, MouseEvent } from "react";
import { RouterContext } from "./Router";

interface LinkProps {
  to: string;
  isPathChage?: boolean;
  children: ReactNode;
}

const Link: React.FC<LinkProps> = ({ to, children, isPathChage = true }) => {
  const { changePath } = useContext(RouterContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    changePath(to, isPathChage);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;
