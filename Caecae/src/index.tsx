import ReactDOM from "react-dom/client";
import "./index.css";
import { Router, Routes, Route } from "./shared/Hyunouter/index.tsx";
import EventInfoLandingPage from "./pages/EventInfoLanding/EventInfoLandingPage.tsx";
import FindingGameLandingPage from "./pages/FindingGameLanding/FindingGameLandingPage.tsx";
import RacingGameLandingPage from "./pages/RacingGameLanding/RacingGameLandingPage.tsx";
import FindingGamePage from "./pages/FindingGame/FindingGamePage.tsx";
import RacingGame from "./components/RacingGame/RacingGame.tsx";

// 임시 React component
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/mainpage" element={<EventInfoLandingPage />} />
          <Route path="/findcasper" element={<FindingGameLandingPage />} />
          <Route path="/racecasper" element={<RacingGameLandingPage />} />
          <Route
            path="/findcaspergame#010643431936"
            element={<FindingGamePage />}
          />
          <Route path="/racecaspergame" element={<RacingGame />} />
        </Routes>
      </Router>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
