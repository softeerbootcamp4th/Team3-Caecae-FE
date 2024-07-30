import React, { useRef, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { motion, useAnimation } from 'framer-motion';
import animationGame315 from './animationGame315.json';
import frontBackground from './frontBackground.svg';
import rearBackground from './rearBackground.svg';

const LottieGame315: React.FC = () => {
  const lottieRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [frontBackgroundWidth, setFrontImageWidth] = useState<number>(0);
  const [rearBackgroundWidth, setRearBackgroundWidth] = useState<number>(0);
  const frontRef = useRef<HTMLDivElement>(null);
  const rearRef = useRef<HTMLDivElement>(null);
  // 애니메이션 제어를 위한 framer-motion 훅
  const frontAnimationControls = useAnimation();
  const rearAnimationControls = useAnimation();

  // 스페이스바 눌렀을 때 멈추는 로직
  const handlePause = () => {
    if (lottieRef.current) {
      (lottieRef.current as any).pause();
      setIsPaused(true);
      // 현재 위치 가져오기 (getBoundingClientRect 사용)
      const currentFrontX = frontRef.current?.getBoundingClientRect().x || 0;
      const currentRearX = rearRef.current?.getBoundingClientRect().x || 0;

      // 부드럽게 멈추는 로직
      frontAnimationControls.start({
        x: currentFrontX - 500, // 현재 위치에서 보이는 부분만큼 이동
        transition: { duration: 1, ease: 'easeOut' }, // 1초 동안 부드럽게 멈춤
      });

      rearAnimationControls.start({
        x: currentRearX - 500, // 현재 위치에서 보이는 부분만큼 이동
        transition: { duration: 1, ease: 'easeOut' }, // 1초 동안 부드럽게 멈춤
      });
    }
  };

  // 게임 시작 로직
  const handlePlay = () => {
    if (lottieRef.current) {
      (lottieRef.current as any).play();
      setIsPaused(false);
 
      frontAnimationControls.start({ x: [0, -10100], transition: { duration: 7, repeat: 0 } });
      rearAnimationControls.start({ x: [0, -5000], transition: { duration: 7 , repeat: 0 } });
    } 
  };

  // isPaused state에 따른 작동 로직 구현
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

  // 2개의 백그라운드 이미지의 width 구하는 로직
  useEffect(() => {
    const frontBackgroundImg = new Image();
    frontBackgroundImg.src = frontBackground;
    frontBackgroundImg.onload = () => {
        setFrontImageWidth(frontBackgroundImg.width);
    }

    const rearBackgroundImg = new Image();
    rearBackgroundImg.src = rearBackground;
    rearBackgroundImg.onload = () => {
        setRearBackgroundWidth(rearBackgroundImg.width);
    }
  }, []);

  //
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPaused]);

  // 처음 마운트 될 때 게임 플레이
  useEffect(() => {
    if (!isPaused) {
      handlePlay();
    }
  }, []);

  return (
    <div style={{ position:'relative', width: 1700, height: 500, overflow: 'hidden', border: '1px solid black' }}>
      <motion.div
        ref={rearRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${rearBackgroundWidth}px`,
          height: '500px',
          backgroundImage: `url(${rearBackground})`,
          backgroundSize: 'auto 100%',
          zIndex: 1
        }}
        animate={rearAnimationControls}
      />
      <motion.div
        ref={frontRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${frontBackgroundWidth}px`,
          height: '500px',
          backgroundImage: `url(${frontBackground})`,
          backgroundSize: 'auto 100%',
          zIndex: 2
        }}
        animate={frontAnimationControls}
      />
      <Lottie
        lottieRef={lottieRef}
        animationData={animationGame315}
        loop={true}
        autoplay={true}
        style={{
          position: 'absolute',
          top: 320,
          left: 100,
          width: 300,
          height: "auto",
          zIndex: 3
        }}
      />
      <p
        style={{
          position: 'absolute',
          bottom: 0,
          left: 10,
          color: '#000000',
          zIndex: 4
        }}>
        Press spacebar to {isPaused ? 'play' : 'pause'}
      </p>
    </div>
  );
};

export default LottieGame315;
