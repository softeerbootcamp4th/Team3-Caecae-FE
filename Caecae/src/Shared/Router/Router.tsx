import { useState, createContext, ReactNode, FC, useEffect } from "react";

interface RouterProps {
  children: ReactNode;
}

interface RouterContextType {
  path: string;
  changePath: (path: string) => void;
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

  const changePath = (newPath: string) => {
    if (path !== newPath) {
      window.history.pushState({}, "", newPath);
      setPath(newPath);
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
