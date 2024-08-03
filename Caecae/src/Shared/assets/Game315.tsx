import React, { useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import animationGame315 from "./animationGame315.json";
import frontBackground from "./frontBackground.svg";
import rearBackground from "./rearBackground.svg";

const Game315: React.FC = () => {
  const lottieRef = useRef(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const rearRef = useRef<HTMLDivElement>(null);
  const [frontBackgroundWidth, setFrontImageWidth] = useState<number>(0);
  const [rearBackgroundWidth, setRearBackgroundWidth] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<string>("previous");
  const [distance, setDistance] = useState<number>(0);

  /** 모션 값을 사용하여 frontBackground의 x 위치 추적 */ 
  const frontX = useMotionValue(0);

  /** 애니메이션 제어를 위한 framer-motion 훅 */
  const frontAnimationControls = useAnimation();
  const rearAnimationControls = useAnimation();
 
  /** 게임 기록을 위한 단위 변환(315km 지점까지 애니메이션 이동거리가 11990) */
  const conversionUnit = 11990 / 315;

  /** 이동한 km를 구하는 함수 */
  const calculateDistance = (x: number) => {
    const totalDistance = Math.abs(x);
    const distanceInKM = totalDistance / conversionUnit;
    setDistance(distanceInKM);
  };

  /** 스페이스바를 눌렀을 때 멈추는 로직 */
  const handleSmoothlyStop = () => {
    if (lottieRef.current) {
      (lottieRef.current as any).pause();

      /** 현재 위치 가져오기 (getBoundingClientRect 사용) */
      const currentFrontX = frontRef.current?.getBoundingClientRect().x || 0;
      const currentRearX = rearRef.current?.getBoundingClientRect().x || 0;

      /** 부드럽게 멈추는 로직 */
      frontAnimationControls.start({
        x: currentFrontX - 500, // 현재 위치에서 500 만큼 더 이동
        transition: { duration: 1, ease: "easeOut" } // 1초 동안 부드럽게 멈춤
      });

      /** 부드럽게 멈추는 로직 */
      rearAnimationControls.start({
        x: currentRearX - 500, // 현재 위치에서 500 만큼 더 이동
        transition: { duration: 1, ease: "easeOut" } // 1초 동안 부드럽게 멈춤
      });
    }
  };

  /** 스페이스 바를 눌렀을 때 작동 로직 */
  const handleSpacebar = (event: KeyboardEvent) => {
    if(event.code === "Space") {
      event.preventDefault();

      handleSmoothlyStop();
      setGameStatus("end");
    }
  };

  /** 게임 시작 시 작동 로직 */
  const handlePlayGame = () => {
    setGameStatus("playing");

    if (lottieRef.current) {
      (lottieRef.current as any).play();
 
      frontAnimationControls.start({
        x: [0,  -14000],
        transition: { duration: 7, repeat: 0 }
      }).then(() => {
        (lottieRef.current as any).pause();
        setGameStatus("end");
      });

      rearAnimationControls.start({
        x: [0, -7000],
        transition: { duration: 7, repeat: 0 }
      });
    }
  };

  /** 2개의 백그라운드 이미지의 width를 구하는 로직 */
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

  /** keydown 이벤트 리스너 등록 */
  useEffect(() => {
    if (gameStatus === "playing") {
      document.addEventListener("keydown", handleSpacebar);
    } else {
      document.removeEventListener("keydown", handleSpacebar);
    }
    return () => {
      document.removeEventListener("keydown", handleSpacebar);
    };
  }, [gameStatus]);

  /** 애니메이션의 움직인 거리(x좌표값)가 바뀔 때 마다 km를 계산 */
  useEffect(() => {
    const unsubscribeFrontX = frontX.onChange((latest) => {
      calculateDistance(latest);
    });

    return () => unsubscribeFrontX();
  }, [frontX]);

  /** 게임 상태에 따라 다르게 보여지는 콘텐츠 */
  const gameContent = () => {
    switch(gameStatus) {
      case "previous":
        return (
          <div className="absolute left-[700px] top-[70px] z-40 flex flex-col items-center justify-center">
            <div className="font-bold text-xl mb-2">CASPER ELECTRIC</div>
            <div className="font-bold text-xl mb-2">전력으로...!</div>
            <div className="mt-2">
              <button 
                className=""
                onClick={handlePlayGame} >
                  <img className="w-[300px] h-[55px]" src="src/Shared/assets/gameStartBtn.svg" alt="gameStartBtn" />
              </button>
            </div>
          </div>
        );
      case "playing":
        return (
          <div className="absolute left-[650px] top-[70px] z-40 flex flex-col items-center justify-center">
            <div className="font-bold text-xl mb-2">Game Score</div>
            <div className="font-bold text-xl mb-2">{distance.toFixed(3)} KM</div>
            <div className="flex flex-row items-center justify-center mt-2">
              <div className="font-bold text-xl mr-2">stop :</div>
              <div className="ml-2">
                <img src="src/Shared/assets/spacebarBtn.svg" alt="spacebarBtn" />
              </div>
            </div>
          </div>
        );
      case "end":
        return (
          <div className="absolute left-[630px] top-[70px] z-40 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="font-bold text-xl mb-2">Game Score</div>
              <div className="font-bold text-xl mb-2">{distance.toFixed(3)} KM</div>
            </div>
            <div className="flex flex-row items-center justify-center mt-2 space-x-4">
              <button
                className=""
                // onClick={}
                >
                <img className="h-[50px]" src="src/Shared/assets/enterEventBtn.svg" alt="enterEventBtn" />
              </button>
              <button
                className=""
                onClick={handlePlayGame} >
                <img className="h-[50px]" src="src/Shared/assets/retryBtn.svg" alt="retryBtn" />
              </button>
            </div>
          </div>
        )
      default:
        return null;
    }
  }

  const gameMenu = () => {
    switch(gameStatus) {
      case "previous":
        return (
          <div className="absolute right-[50px] top-[30px] z-40">
            <button>게임 종료</button>
          </div>
        );
      case "playing":
        return (
         <div className="absolute right-[50px] top-[30px] z-40">
          <button>게임 종료</button>
         </div> 
        );
      case "end":
        return (
          <div className="absolute right-[50px] top-[30px] z-40 space-x-4">
            <button>기록 자랑하기</button>
            <button>게임 종료</button>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="relative w-[1600px] h-[700px] overflow-hidden border border-black mt-[50px]">
      <motion.div
        ref={rearRef}
        className="absolute top-0 left-0 h-[700px] bg-[auto_100%] z-[1]"
        style={{
          width: `${rearBackgroundWidth}px`,
          backgroundImage: `url(${rearBackground})`
        }}
        animate={rearAnimationControls}
      />
      <motion.div
        ref={frontRef}
        className="absolute top-0 left-0 h-[700px] bg-[auto_100%] z-[2]"
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
        className="absolute top-[485px] left-[250px] w-[350px] h-auto z-[3]"
      />
      {gameContent()}
      {gameMenu()}
    </div>
  );
};

export default Game315;
