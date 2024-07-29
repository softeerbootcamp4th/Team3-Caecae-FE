import { useEffect, useRef } from "react";

const useChangeDependency = (cb: () => void, dependency: unknown[]) => {
  const initRef = useRef(false);
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
    } else {
      cb();
    }
  }, dependency);
};

export default useChangeDependency;
