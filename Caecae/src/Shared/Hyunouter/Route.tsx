import { ReactElement } from "react";

interface RouteProps {
  path: string;
  isFullScreen: boolean;
  element: ReactElement;
}

const Route: React.FC<RouteProps> = () => {
  return null; // 실제로 렌더링하지 않음
};

export default Route;
