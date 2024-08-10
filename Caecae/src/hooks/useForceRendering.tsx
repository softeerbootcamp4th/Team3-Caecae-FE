import { useState } from "react";

const useForceRendering = () => {
  const [state, setState] = useState(false);
  return () => {
    state;
    setState((prev) => !prev);
  };
};

export default useForceRendering;
