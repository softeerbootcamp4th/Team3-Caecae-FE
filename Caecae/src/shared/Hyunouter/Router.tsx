import { useState, createContext, ReactNode, FC, useEffect } from "react";

interface RouterProps {
  children: ReactNode;
}

interface RouterContextType {
  path: string;
  changePath: (path: string, isChangePath?: boolean) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: "",
  changePath: () => undefined,
});
RouterContext.displayName = "RouterContext";

const Router: FC<RouterProps> = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const changePath = (newPath: string, isChangePath: boolean = true) => {
    if (path !== newPath) {
      if (isChangePath) {
        window.history.pushState({}, "", newPath);
      }
      setPath(newPath);
      window.scrollTo(0, 0);
    }
  };
  const contextValue = {
    path: path,
    changePath: changePath,
  };
  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

export { Router, RouterContext };
