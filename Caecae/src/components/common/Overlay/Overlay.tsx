import React, { ReactNode } from "react";
import {
  initOverlayState,
  overlayReducer,
  action,
} from "../../../jobs/Overlay/OverlayWork";
import findChildrenElement from "../../../utils/FindChildrenElement";
import { store, useWork } from "../../../shared/Hyundux";

interface OverLayProps {
  children: ReactNode;
}

const OverLay: React.FC<OverLayProps> = ({ children }) => {
  const [state, dispatch] = useWork(initOverlayState, overlayReducer);
  dispatch;
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
            src="/public/assets/xButton.svg"
            className="absolute right-10 top-10"
            onClick={() => {
              // Todo: store 지우기
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
