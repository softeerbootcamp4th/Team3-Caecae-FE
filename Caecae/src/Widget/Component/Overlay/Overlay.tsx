import React, { ReactNode } from "react";
import useWork from "../../../Shared/Hyundux/Hooks/useWork";
import {
  initOverlayState,
  overlayReducer,
  action,
} from "../../../Job/Overlay/OverlayWork";
import store from "../../../Shared/Hyundux/Store";
import findChildrenElement from "../../../Shared/Util/FindChildrenElement";

interface OverLayProps {
  children: ReactNode;
}

const OverLay: React.FC<OverLayProps> = ({ children }) => {
  const state = useWork(initOverlayState, overlayReducer);
  const content = findChildrenElement(
    children,
    (element) =>
      element.props.index !== undefined && element.props.index == state.index
  );

  if (state.isShowing) {
    return (
      <div className="absolute inset-0 bg-black opacity-50 flex flex-col items-center justify-center">
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
