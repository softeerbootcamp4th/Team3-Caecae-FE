import React, {
  useContext,
  ReactElement,
  ReactNode,
  isValidElement,
} from "react";
import { RouterContext } from "./Router";

interface RoutesProps {
  children: ReactNode;
}

const Routes: React.FC<RoutesProps> = ({ children }) => {
  const { path, addFullScreenPath } = useContext(RouterContext);

  let element: ReactElement | null = null;

  React.Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    if (child.props.isFullScreen) {
      addFullScreenPath(child.props.path);
    }
    if (child.type === React.Fragment) {
      return;
    }
    if (!child.props.path || !child.props.element) {
      return;
    }
    if (child.props.path !== path) {
      return;
    }

    element = child.props.element;
  });

  return element;
};

export default Routes;
