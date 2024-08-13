import ReactDOM from "react-dom/client";
import "./index.css";
import { Router, Routes, Route } from "./shared/Hyunouter/index.tsx";
import EventInfoLandingPage from "./pages/EventInfoLanding/EventInfoLandingPage.tsx";
import FindingGameLandingPage from "./pages/FindingGameLanding/FindingGameLandingPage.tsx";
import RacingGameLandingPage from "./pages/RacingGameLanding/RacingGameLandingPage.tsx";
import FindingGamePage from "./pages/FindingGame/FindingGamePage.tsx";
import RacingGamePage from "./pages/RacingGame/RacingGamePage.tsx";
import AdminPage from "./pages/Admin/AdminPage.tsx";

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
