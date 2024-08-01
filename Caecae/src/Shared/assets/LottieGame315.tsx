import React, { useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import animationGame315 from "./animationGame315.json";
import frontBackground from "./frontBackground.svg";
import rearBackground from "./rearBackground.svg";

const LottieGame315: React.FC = () => {
  const lottieRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [frontBackgroundWidth, setFrontImageWidth] = useState<number>(0);
  const [rearBackgroundWidth, setRearBackgroundWidth] = useState<number>(0);
  const frontRef = useRef<HTMLDivElement>(null);
  const rearRef = useRef<HTMLDivElement>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [distance, setDistance] = useState<number>(0);

  // 모션 값을 사용하여 frontBackground의 x 위치 추적
  const frontX = useMotionValue(0);

  // 애니메이션 제어를 위한 framer-motion 훅
  const frontAnimationControls = useAnimation();
  const rearAnimationControls = useAnimation();
 
  const conversionUnit = 8500 / 315;

  const calculateDistance = (x: number) => {
    const totalDistance = Math.abs(x);
    const distanceInKM =  totalDistance / conversionUnit;
    setDistance(distanceInKM);
  };

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
        transition: { duration: 1, ease: "easeOut" }, // 1초 동안 부드럽게 멈춤
      });

      rearAnimationControls.start({
        x: currentRearX - 500, // 현재 위치에서 보이는 부분만큼 이동
        transition: { duration: 1, ease: "easeOut" }, // 1초 동안 부드럽게 멈춤
      });
    }
  };

  // 게임 시작 로직
  const handlePlay = () => {
    if (lottieRef.current) {
      (lottieRef.current as any).play();
      setIsPaused(false);
 
      frontAnimationControls.start({ x: [0,  -10000], transition: { duration: 7, repeat: 0 } });
      rearAnimationControls.start({ x: [0, -5000], transition: { duration: 7, repeat: 0 } });
    } 
  };

  // isPaused state에 따른 작동 로직
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      if (isPaused) {
        handlePlay();
      } else {
        handlePause();
      }
    }
  };

  // 게임 시작 버튼 클릭 시 작동 로직
  const handleButtonClick = () => {
    setIsButtonVisible(false);
    handlePlay();
  };

  // 2개의 백그라운드 이미지의 width를 구하는 useEffect
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

  // keydown 이벤트 리스너 등록
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPaused]);

  useEffect(() => {
    const unsubscribeFrontX = frontX.onChange((latest) => {
      calculateDistance(latest);
    });

    return () => unsubscribeFrontX();
  }, [frontBackgroundWidth, frontX]);

  return (
    <div className="relative w-[1700px] h-[500px] overflow-hidden border border-black mt-[50px]">
      <motion.div
        ref={rearRef}
        className="absolute top-0 left-0 h-[500px] bg-[auto_100%] z-[1]"
        style={{
          width: `${rearBackgroundWidth}px`,
          backgroundImage: `url(${rearBackground})`
        }}
        animate={rearAnimationControls}
      />
      <motion.div
        ref={frontRef}
        className="absolute top-0 left-0 h-[500px] bg-[auto_100%] z-[2]"
        style={{
          width: `${frontBackgroundWidth}px`,
          backgroundImage: `url(${frontBackground})`,
          x: frontX
        }}
        animate={frontAnimationControls}
      />
      <Lottie
        lottieRef={lottieRef}
        animationData={animationGame315}
        loop={true}
        autoplay={false}
        className="absolute top-[320px] left-[200px] w-[300px] h-auto z-[3]"
      />
      <p
        className="absolute bottom-0 left-[10px] text-black z-[4]">
        Press spacebar to {isPaused ? "play" : "pause"}
      </p>
      {isButtonVisible ? (
        <div className="absolute left-[700px] top-[70px] z-40 flex flex-col items-center justify-center">
          <div className="font-bold text-xl mb-2">CASPER ELECTRIC</div>
          <div className="font-bold text-xl mb-2">전력으로...!</div>
          <div className="mt-2">
            <button 
              className="w-[300px] h-[55px]"
              onClick={handleButtonClick} >
                <img src="src/Shared/assets/gameStartBtn.svg" alt="gameStartBtn"/>
            </button>
          </div>
        </div>
        
      ) : (
        <div className="absolute left-[650px] top-[70px] z-40 flex flex-col items-center justify-center">
          <div className="font-bold text-xl mb-2">Game Score</div>
          <div className="font-bold text-xl mb-2">{distance.toFixed(3)} KM</div>
          <div className="mt-2 flex flex-row items-center justify-center">
            <div className="font-bold text-xl mr-2">stop :</div>
            <div className="ml-2">
              <img src="src/Shared/assets/spacebarBtn.svg" alt="spacebarBtn" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LottieGame315;
