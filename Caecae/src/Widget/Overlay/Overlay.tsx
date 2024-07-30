import React, { ReactNode } from "react";
import { initOverlayState, action } from "../../Job/Overlay/OverlayWork";
import store from "../../Shared/Hyundux/Store";
import findChildrenElement from "../../Shared/Util/FindChildrenElement";
import useExistState from "../../Shared/Hyundux/Hooks/useExistState";

interface OverLayProps {
  children: ReactNode;
}

const OverLay: React.FC<OverLayProps> = ({ children }) => {
  const state = useExistState(initOverlayState);
  const content = findChildrenElement(
    children,
    (element) =>
      element.props.index !== undefined && element.props.index == state.index
  );

  if (state.isShowing) {
    return (
      <div className="absolute z-[100] inset-0 flex flex-col items-center justify-center">
        <div className="absolute bg-black opacity-50 w-full h-full"></div>
        <div
          className="relative bg-white shadow-lg z-10"
          style={{ width: "62%", height: "71%" }}
        >
          <img
            src="/src/Shared/assets/xButton.svg"
            className="absolute right-10 top-10"
            onClick={() => {
              store.dispatch(action.toggleOverlay());
            }}
          />
          {content}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default OverLay;
