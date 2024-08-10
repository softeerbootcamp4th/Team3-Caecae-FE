import React, { isValidElement, ReactElement, ReactNode } from "react";

const findChildrenElement = (
  elements: ReactNode,
  checkFn: (element: ReactElement) => boolean
): ReactElement | null => {
  let returnElement: ReactElement | null = null;
  React.Children.forEach(elements, (element) => {
    if (!isValidElement(element)) {
      return;
    }
    if (element.type === React.Fragment) {
      return;
    }
    if (checkFn(element)) {
      returnElement = element.props.element;
    }
  });
  return returnElement;
};

export default findChildrenElement;
