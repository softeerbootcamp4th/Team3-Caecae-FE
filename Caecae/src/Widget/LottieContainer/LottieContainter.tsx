import React, { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

interface LottieContainerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  jsonFile: unknown;
  onAnimationEnd?: () => void;
}

const LottieContainer = ({
  jsonFile,
  x,
  y,
  width,
  height,
  onAnimationEnd = () => {},
}: LottieContainerProps) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div
      style={{
        width: width,
        height: height,
        left: `${x}px`,
        top: `${y}px`,
        position: "absolute",
      }}
      className=""
    >
      <Lottie
        loop={false}
        lottieRef={lottieRef}
        animationData={jsonFile}
        autoplay={true}
        onAnimationEnd={onAnimationEnd}
      />
    </div>
  );
};

export default LottieContainer;
