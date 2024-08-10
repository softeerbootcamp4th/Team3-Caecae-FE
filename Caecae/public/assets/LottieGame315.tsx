import React, { useRef, useState, useEffect } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import animationGame315 from './animationGame315.json';

const LottieGame315: React.FC = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = () => {
    if (lottieRef.current) {
      lottieRef.current.pause();
      setIsPaused(true);
    }
  };

  const handlePlay = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
      setIsPaused(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      if (isPaused) {
        handlePlay();
      } else {
        handlePause();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPaused]);

  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationGame315}
        loop={true}
        autoplay={true}
      />
      <p>Press spacebar to {isPaused ? 'play' : 'pause'}</p>
    </div>
  );
};

export default LottieGame315;