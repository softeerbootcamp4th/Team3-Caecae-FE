import React, { ReactNode, useContext, MouseEvent } from "react";
import { RouterContext } from "./Router";

interface LinkProps {
    to: string;
    children: ReactNode;
}

const Link: React.FC<LinkProps> = ({ to, children }) => {
    const { changePath } = useContext(RouterContext);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        changePath(to);
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
};

export default Link;
