import React, { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import animationCorrect from './animationCorrect.json';
import animationIncorrect from './animationIncorrect.json';

const LottieFindCasper: React.FC = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationCorrect}
        loop={true}
        autoplay={true}
      />
      <Lottie
        lottieRef={lottieRef}
        animationData={animationIncorrect}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export default LottieFindCasper;