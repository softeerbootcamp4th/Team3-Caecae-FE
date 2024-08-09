import { useContext } from "react";
import { RouterContext } from "../Hyunouter/Router";

const useIsShowing = (): boolean => {
  const { isFullScreen } = useContext(RouterContext);
  return !isFullScreen;
};

export default useIsShowing;
