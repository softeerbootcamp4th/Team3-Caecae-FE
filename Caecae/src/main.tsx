import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

const App = () => {
  return (
    <div>
      <h2 className="text-blue-500 text-xl font-bold">Hello, React!</h2>
      <p className="text-lg font-medium">Hello, Typescript!</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
