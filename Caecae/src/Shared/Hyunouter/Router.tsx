import {
  useState,
  createContext,
  ReactNode,
  FC,
  useEffect,
  useRef,
} from "react";
import useForceRendering from "../Hooks/useForceRendering";

interface RouterProps {
  children: ReactNode;
}

interface RouterContextType {
  path: string;
  fullScreenPath: string[];
  changePath: (path: string) => void;
  addFullScreenPath: (path: string) => void;
  isFullScreen: boolean;
}

const RouterContext = createContext<RouterContextType>({
  path: "",
  fullScreenPath: [],
  changePath: () => undefined,
  addFullScreenPath: () => undefined,
  isFullScreen: false,
});
RouterContext.displayName = "RouterContext";

const Router: FC<RouterProps> = ({ children }) => {
  const forceRerendering = useForceRendering();
  const [path, setPath] = useState(window.location.pathname);
  const fullScreenPaths = useRef<string[]>([]);
  const isFullScreen = useRef<boolean>(false);
  useEffect(() => {
    if (fullScreenPaths.current.includes(window.location.pathname)) {
      isFullScreen.current = true;
      forceRerendering();
    }
    const handleLocationChange = () => {
      isFullScreen.current = false;
      if (fullScreenPaths.current.includes(window.location.pathname)) {
        isFullScreen.current = true;
      }
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const changePath = (newPath: string) => {
    if (path !== newPath) {
      window.history.pushState({}, "", newPath);
      isFullScreen.current = false;
      if (fullScreenPaths.current.includes(newPath)) {
        isFullScreen.current = true;
      }
      setPath(newPath);
    }
  };

  const addFullScreenPath = (path: string) => {
    const newPaths = fullScreenPaths.current;
    if (newPaths.includes(path)) return;
    newPaths.push(path);
    fullScreenPaths.current = newPaths;
  };

  const contextValue = {
    path: path,
    changePath: changePath,
    fullScreenPath: fullScreenPaths.current,
    addFullScreenPath: addFullScreenPath,
    isFullScreen: isFullScreen.current,
  };
  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

export { Router, RouterContext };
