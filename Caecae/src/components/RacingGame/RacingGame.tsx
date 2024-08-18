import React, { useRef, useState, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import animationGame315 from "@assets/animationGame315.json";
import frontBackground from "@assets/frontBackground.svg";
import rearBackground from "@assets/rearBackground.svg";
import {
  action,
  initRacingGameState
} from "../../jobs/RacingGame/RacingGameWork.tsx";
import { store, useExistState } from "../../shared/Hyundux/index.tsx";
import Link from "../../shared/Hyunouter/Link.tsx";
import getRacingGameTopRate from "../../stories/getRacingGameTopRate.tsx";

/** 게임 상태에 따라 다르게 보여지는 콘텐츠 */
const gameContent = (
  gameStatus: string,
  distance: number,
  topRate: number | null,
  isButtonDisabled: boolean,
  handlePlayGame: () => void,
  enterEvent: () => void
) => {
  switch (gameStatus) {
    case "previous":
    case "enterEvent":
      return (
        <div className="absolute left-[35%] top-[70px] z-40 flex flex-col items-center justify-center font-galmuri">
          <div className="font-bold text-xl mb-2 pr-5 text-[#A8A8A8]">CASPER ELECTRIC</div>
          <div className=" text-[44px] mb-2 text-[#666666]">전력으로...!</div>
          <div className="mt-5">
            <button className="w-[500px]" onClick={handlePlayGame}>
              <img
                className="w-[500px]"
                src="/assets/gameStartBtn.svg"
                alt="gameStartBtn"
              />
            </button>
          </div>
        </div>
      );
    case "playing":
      return (
        <div className="absolute left-[37%] top-[70px] z-40 flex flex-col items-center justify-center font-galmuri">
          <div className="font-bold text-xl mb-2 text-[#A8A8A8]">Game Score</div>
          <div className="font-bold mb-2 text-[52px]">{distance.toFixed(3)} KM</div>
          <div className="flex flex-row items-center justify-center mt-2">
            <div className="font-bold text-[28px] mr-2 text-[#666666]">stop :</div>
            <div className="ml-2">
              <img src="/assets/spacebarBtn.svg" alt="spacebarBtn" />
            </div>
          </div>
        </div>
      );
    case "end":
      return (
        <div className="absolute left-[37%] top-[70px] z-40 flex flex-col items-center justify-center font-galmuri">
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-xl mb-1 text-[#A8A8A8]">Game Score</div>
            <div className="flex flex-row space-x-2">
              <div className="font-bold text-[52px] mb-2">
                {distance.toFixed(3)} KM
              </div>
              <div className="font-bold text-2xl text-[#3D3D3D] flex items-end pb-5 pl-1">
                {`상위 ${topRate}%`}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center mt-2 space-x-4">
            <button
              className={`${isButtonDisabled? "opacity-50" : ""}`}
              onClick={enterEvent}
              disabled={isButtonDisabled}
            >
              <img
                className="h-[50px]"
                src="/assets/enterEventBtn.svg"
                alt="enterEventBtn"
              />
            </button>
            <button
              className={`${isButtonDisabled? "opacity-50" : ""}`}
              onClick={handlePlayGame}
              disabled={isButtonDisabled}
            >
              <img
                className="h-[50px]"
                src="/assets/retryBtn.svg"
                alt="retryBtn"
              />
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

/** 게임 상태에 따라 다르게 보여지는 우측 상단 메뉴 */
const gameMenu = (gameStatus: string) => {
  switch (gameStatus) {
    case "previous":
    case "playing":
    case "enterEvent":
      return (
        <div className="absolute right-[50px] top-[30px] z-40 font-galmuri text-[#494949] text-xl">
          <Link to="/racecasper">
            <button>게임 종료</button>  
          </Link>
        </div>
      );
    case "end":
      return (
        <div className="absolute right-[50px] top-[30px] z-40 space-x-10 font-galmuri text-[#494949] text-xl">
          <button>기록 자랑하기</button>
          <Link to="/racecasper">
            <button>게임 종료</button>
          </Link>
        </div>
      );
    default:
      return null;
  }
};

const RacingGame: React.FC = () => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const rearRef = useRef<HTMLDivElement>(null);
  const [frontBackgroundWidth, setFrontImageWidth] = useState<number>(0);
  const [rearBackgroundWidth, setRearBackgroundWidth] = useState<number>(0);
  const state = useExistState(initRacingGameState);
  const [topRate, setTopRate] = useState<number | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  /** 모션 값을 사용하여 frontBackground의 x 위치 추적 */
  const frontX = useMotionValue(0);

  /** 애니메이션 제어를 위한 framer-motion 훅 */
  const frontAnimationControls = useAnimation();
  const rearAnimationControls = useAnimation();

  const playingSoundRef = useRef<HTMLAudioElement | null>(null);
  const stopSoundRef = useRef<HTMLAudioElement | null>(null);
  const stopSoundPlayedRef = useRef<boolean>(false);
  const endGameTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetAudio = (audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1.0;
      audio.load();
    }
  };

  const playAudio = (audio: HTMLAudioElement | null) => {
    if (audio) {
      resetAudio(audio);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio play error:", error);
        });
      }
    }
  };

  /** 이동한 km를 구하는 함수 */
  const calculateDistance = (x: number) => {
    const totalDistance = Math.abs(x);

    store.dispatch(action.updateDistance(totalDistance));
  };

  const handleSmoothlyStop = () => {
    if (endGameTimeoutRef.current) {
      clearTimeout(endGameTimeoutRef.current);
    }

    if (lottieRef.current) {
      lottieRef.current?.pause();

      /** 현재 위치 가져오기 (getBoundingClientRect 사용) */
      const currentFrontX = frontRef.current?.getBoundingClientRect().x || 0;
      const currentRearX = rearRef.current?.getBoundingClientRect().x || 0;

      frontAnimationControls.start({
        x: currentFrontX - 500,
        transition: { duration: 1, ease: "easeOut" },
      });

      rearAnimationControls.start({
        x: currentRearX - 500,
        transition: { duration: 1, ease: "easeOut" },
      });

      fadeOutSound(playingSoundRef.current, 1000, () => {
        if (!stopSoundPlayedRef.current) {
          stopSoundPlayedRef.current = true;
          playAudio(stopSoundRef.current);
        }
      });
    }
  };

  const handleSpacebar = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();

      handleSmoothlyStop();
      store.dispatch(action.gameEnd());
    }
  };

  const handlePlayGame = () => {
    setIsButtonDisabled(true);

    stopSoundPlayedRef.current = false;
    playAudio(playingSoundRef.current);

    store.dispatch(action.gameStart());

    if (lottieRef.current) {
      lottieRef.current?.play();

      frontAnimationControls
        .start({
          x: [0, -14000],
          transition: { duration: 7, repeat: 0 },
        })
        .then(() => {
          handleSmoothlyStop();
          store.dispatch(action.gameEnd());
        });

      rearAnimationControls.start({
        x: [0, -7000],
        transition: { duration: 7, repeat: 0 },
      });

      endGameTimeoutRef.current = setTimeout(() => {
        handleSmoothlyStop();
        store.dispatch(action.gameEnd());
      }, 6000);
    }
  };

  const fadeOutSound = (audio: HTMLAudioElement | null, duration: number, callback: () => void) => {
    if (!audio) return;

    const step = 0.1;
    const fadeInterval = duration / (audio.volume / step);

    const fade = setInterval(() => {
      if (audio.volume > step) {
        audio.volume -= step;
      } else {
        clearInterval(fade);
        audio.volume = 0;
        audio.pause();
        callback();
      }
    }, fadeInterval);
  };

  const enterEvent = () => {
    store.dispatch(action.enterEvent());
  }

  useEffect(() => {
    const frontBackgroundImg = new Image();
    frontBackgroundImg.src = frontBackground;
    frontBackgroundImg.onload = () => {
      setFrontImageWidth(frontBackgroundImg.width);
    };

    const rearBackgroundImg = new Image();
    rearBackgroundImg.src = rearBackground;
    rearBackgroundImg.onload = () => {
      setRearBackgroundWidth(rearBackgroundImg.width);
    };

    playingSoundRef.current = new Audio("/assets/audio/racingGamePlayingSound.wav");
    stopSoundRef.current = new Audio("/assets/audio/racingGameStopSound.wav");

    return () => {
      resetAudio(playingSoundRef.current);
      resetAudio(stopSoundRef.current);
      if (endGameTimeoutRef.current) {
        clearTimeout(endGameTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (state.gameStatus === "playing") {
      document.addEventListener("keydown", handleSpacebar);
    } else {
      document.removeEventListener("keydown", handleSpacebar);
    }
    return () => {
      document.removeEventListener("keydown", handleSpacebar);
    };
  }, [state.gameStatus]);

  /** 애니메이션의 움직인 거리(x좌표값)가 바뀔 때 마다 km를 계산 */
  useEffect(() => {
    const unsubscribeFrontX = frontX.onChange((latest) => {
      calculateDistance(latest);
    });

    return () => unsubscribeFrontX();
  }, [frontX]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRacingGameTopRate(state.distance);
        setTopRate(Number(response.data.percent.toFixed(3)));
      }catch (error) {
        console.error("레이싱 게임 점수 백분위 api 연결 에러:", error);
        setTopRate(null);
      }
    };

    fetchData();
  }, [state.distance]);

  useEffect(() => {
    if (state.gameStatus === "end") {
      const timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [state.gameStatus]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <motion.div
        ref={rearRef}
        className="absolute top-0 left-0 h-[700px] bg-[auto_100%] z-[1]"
        style={{
          width: `${rearBackgroundWidth}px`,
          backgroundImage: `url(${rearBackground})`,
        }}
        animate={rearAnimationControls}
      />
      <motion.div
        ref={frontRef}
        className="absolute top-0 left-0 h-[700px] bg-[auto_100%] z-[2]"
        style={{
          width: `${frontBackgroundWidth}px`,
          backgroundImage: `url(${frontBackground})`,
          x: frontX,
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
      {gameContent(state.gameStatus, state.distance, topRate, isButtonDisabled, handlePlayGame, enterEvent)}
      {gameMenu(state.gameStatus)}
    </div>
  );
};

export default RacingGame;