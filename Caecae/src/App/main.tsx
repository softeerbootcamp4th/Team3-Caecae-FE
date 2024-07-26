import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { Router } from "../Shared/Router/Router.tsx";
import Routes from "../Shared/Router/Routes.tsx";
import Route from "../Shared/Router/Route.tsx";
import Navigation from '../Widget/Component/Navigation/Navigation.tsx'

// 임시 React component
const App = () => {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          <Route 
            path="/mainpage" 
            element={<div>시작페이지</div>} />
          <Route 
            path="/findcasper" 
            element={<div>캐스퍼찾기게임</div>} />
          <Route 
            path="/racecasper" 
            element={<div>315게임</div>} />
        </Routes>
      </Router>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
