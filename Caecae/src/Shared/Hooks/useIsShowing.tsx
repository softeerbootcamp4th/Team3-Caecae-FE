import { useContext } from "react";
import { RouterContext } from "../Hyunouter/Router";

const useIsShowing = (): boolean => {
  const { isFullScreen } = useContext(RouterContext);
  console.log(isFullScreen);
  return !isFullScreen;
};

export default useIsShowing;
