import "./HintSpot.css";
import React from "react";

interface HintSpotProps {
  y: number;
  x: number;
}

const HintSpot: React.FC<HintSpotProps> = ({ y, x }) => {
  const style: React.CSSProperties = {
    position: "absolute",
    zIndex: 20,
    top: `${y - 25}px`,
    left: `${x - 25}px`,
    width: "50px",
    animation: "fade-in-out 1s ease-in-out infinite",
  };

  return (
    <img
      src="/public/assets/hintSpot.svg"
      alt="hintImg"
      style={style}
      className="fade-in-out"
    />
  );
};

export default HintSpot;
