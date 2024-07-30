import React, { memo, useRef } from "react";
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
  const left = x - width / 2;
  const top = y - height / 2;
  return (
    <div
      style={{
        width: width,
        height: height,
        left: `${left}px`,
        top: `${top}px`,
        position: "absolute",
      }}
      className=""
    >
      <Lottie
        loop={false}
        lottieRef={lottieRef}
        animationData={jsonFile}
        autoplay={true}
        onComplete={onAnimationEnd}
      />
    </div>
  );
};

export default memo(LottieContainer);
