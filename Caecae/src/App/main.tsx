import ReactDOM from "react-dom/client";
import "./main.css";
import FindingGamePage from "../Page/FindingGame/FindingGamePage";

// 임시 React component
const App = () => {
  return <FindingGamePage />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
