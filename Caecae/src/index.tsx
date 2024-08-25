import ReactDOM from "react-dom/client";
import "./index.css";
import { Router, Routes, Route } from "./shared/Hyunouter/index";
import EventInfoLandingPage from "./pages/EventInfoLanding/EventInfoLandingPage";
import FindingGameLandingPage from "./pages/FindingGameLanding/FindingGameLandingPage";
import RacingGameLandingPage from "./pages/RacingGameLanding/RacingGameLandingPage";
import FindingGamePage from "./pages/FindingGame/FindingGamePage";
import RacingGamePage from "./pages/RacingGame/RacingGamePage";
import AdminPage from "./pages/Admin/AdminPage";

// 임시 React component
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<EventInfoLandingPage />} />
          <Route path="/findcasper" element={<FindingGameLandingPage />} />
          <Route path="/racecasper" element={<RacingGameLandingPage />} />
          <Route
            path="/findcaspergame#010643431936"
            element={<FindingGamePage />}
          />
          <Route path="/racecaspergame" element={<RacingGamePage />} />
          <Route path="/adminCaecCae" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
