import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { Router } from "../Shared/Hyunouter/Router.tsx";
import Routes from "../Shared/Hyunouter/Routes.tsx";
import Route from "../Shared/Hyunouter/Route.tsx";
import LottieGame315 from "../Shared/assets/LottieGame315.tsx";
import FindingGameLadingPage from "../Page/FindingGameLanding/FindingGameLadingPage.tsx";
import FindingGamePage from "../Page/FindingGame/FindingGamePage.tsx";
import FindingGame from "../Component/FindingGame/FindingGame.tsx";

// 임시 React component
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/mainpage" element={<div>시작페이지</div>} />
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
