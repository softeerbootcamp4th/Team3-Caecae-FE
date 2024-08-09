import ReactDOM from "react-dom/client";
import "./index.css";
import { Router, Routes, Route } from "./shared/Hyunouter/index.tsx";
import LottieGame315 from "../public/assets/LottieGame315.tsx";
import FindingGameLadingPage from "./pages/FindingGameLanding/FindingGameLadingPage.tsx";
import FindingGamePage from "./pages/FindingGame/FindingGamePage.tsx";
import FindingGame from "./components/FindingGame/FindingGame.tsx";
import EventInfoLandingPage from "./pages/EventInfoLanding/EventInfoLandingPage.tsx";

// 임시 React component
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/mainpage" element={<EventInfoLandingPage />} />
          <Route path="/findcasper" element={<FindingGameLadingPage />} />
          <Route
            path="/racecasper"
            element={
              <div className="flex justify-center items-center">
                <LottieGame315 />
              </div>
            }
          />
          <Route
            path="/findcaspergame#010643431936"
            element={<FindingGamePage />}
          />
        </Routes>
      </Router>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
