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
import { getRacingGameTopRateStory } from "../../stories/RacingGame/getRacingGameTopRate.tsx";
import { useAudio } from "../../hooks/index.tsx";
import useSaga from "../../shared/Hyundux-saga/useSaga.tsx";
import getRacingGameShortUrl, { getRacingGameShortUrlBodyParameter } from "../../stories/RacingGame/getRacingGameShortUrl.tsx";
import useKeyBoardControl from "../../hooks/useKeyBoardControl.tsx";

const RacingGame: React.FC = () => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const rearRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<number>(7);
  const [frontBackgroundWidth, setFrontImageWidth] = useState<number>(0);
  const [rearBackgroundWidth, setRearBackgroundWidth] = useState<number>(0);
  const state = useExistState(initRacingGameState);
  const [, teller] = useSaga();
  const animationCompletedRef = useRef(false);
  const firstCompleteBlockRef = useRef(false);
  const [showMessage, setShowMessage] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  /** 모션 값을 사용하여 frontBackground의 x 위치 추적 */
  const frontX = useMotionValue(0);

  /** 애니메이션 제어를 위한 framer-motion 훅 */
  const frontAnimationControls = useAnimation();
  const rearAnimationControls = useAnimation();

  const endGameTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    audio: playingMusic,
    playAudio: playingMusicPlay,
    resetAudio: playingMusicReset,
  } = useAudio("/assets/audio/racingGamePlayingSound.wav");
  const { playAudio: stopingMusicPlay, resetAudio: stopingMusicReset } =
    useAudio("/assets/audio/racingGameStopSound.wav");

  /* 5~10초 중 랜덤 */
  const getRandomDuration = () => {
    return Math.floor(Math.random() * (10 - 5 + 1)) + 5;
  };

  /** 이동한 km를 구하는 함수 */
  const calculateDistance = (x: number) => {
    const totalDistance = Math.abs(x);

    store.dispatch(action.updateDistance(totalDistance));
  };

  const handleSmoothlyStop = (duration: number) => {
    const moveMoreDistance = [700, 600, 500, 400, 300, 200]

    if (endGameTimeoutRef.current) {
      clearTimeout(endGameTimeoutRef.current);
    }

    if (lottieRef.current) {
      lottieRef.current?.pause();

      /** 현재 위치 가져오기 (getBoundingClientRect 사용) */
      const currentFrontX = frontRef.current?.getBoundingClientRect().x || 0;
      const currentRearX = rearRef.current?.getBoundingClientRect().x || 0;

      frontAnimationControls.start({
        x: currentFrontX - moveMoreDistance[duration - 5],
        transition: { duration: 1, ease: "easeOut" },
      });

      rearAnimationControls.start({
        x: currentRearX - moveMoreDistance[duration - 5],
        transition: { duration: 1, ease: "easeOut" },
      });

      fadeOutStopingMusic();
    }

    animationCompletedRef.current = true;
  };

  const fadeOutStopingMusic = () => {
    const step = 0.1;
    const duration = 1000;
    const fadeInterval = duration / (playingMusic.volume / step);

    const fade = setInterval(() => {
      if (playingMusic.volume > step) {
        playingMusic.volume -= step;
      } else {
        clearInterval(fade);
        playingMusicReset();
        stopingMusicPlay();
      }
    }, fadeInterval);
  };

  const handlePlayGame = () => {
    durationRef.current = getRandomDuration();

    stopingMusicReset();
    playingMusicPlay();

    store.dispatch(action.gameStart());

    animationCompletedRef.current = false;
    firstCompleteBlockRef.current = false;

    if (lottieRef.current) {
      lottieRef.current?.play();

      frontAnimationControls
        .start({
          x: [0, -14000],
          transition: { duration: durationRef.current, repeat: 0 },
        });

      rearAnimationControls.start({
        x: [0, -7000],
        transition: { duration: durationRef.current, repeat: 0 },
      });

      endGameTimeoutRef.current = setTimeout(() => {
        handleSmoothlyStop(durationRef.current);
      }, durationRef.current * 1000 - 1000);
    }
  };

  const enterEvent = () => {
    store.dispatch(action.enterEvent());
  }

  const shareGameScore = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    console.log(shareGameScore);

    const fetchData = async () => {
      try {
        const requestData: getRacingGameShortUrlBodyParameter = {
          distance: Number(state.distance.toFixed(3)),
          percentage: Number(state.topRate.toFixed(3)),
        };
  
        const response = await getRacingGameShortUrl(requestData);
        const shortUrl = response.data.shortUrl;
        const baseShareUrl = "http://www.caecae.kro.kr/a/"
        const shareUrl = baseShareUrl + shortUrl;

        let textArea = document.createElement("textarea");
        textArea.value = shareUrl;

        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";

        document.body.appendChild(textArea);
        textArea.select();

        return new Promise((res, rej) => {
            if (document.execCommand('copy')) {
                res(shareUrl)
            }else {
                rej();
            }
            textArea.remove();
        }).then(() => {
          setShowMessage(true);
  
          setTimeout(() => {
            setAnimate(true);
  
            setTimeout(() => {
              setAnimate(false);
  
              setTimeout(() => {
                setShowMessage(false);
                setIsAnimating(false);
              }, 500);
  
            }, 3000);
            
          }, 10);  
        }).catch((error) => {
          console.error("클립보드 복사 실패:", error);
          setIsAnimating(false);
        });
      }catch(error) {
        console.error("단축 Url api 호출 실패:", error);
      }
    }

    fetchData();
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

    return () => {
      playingMusicReset()
      stopingMusicReset()
      if(endGameTimeoutRef.current) {
        clearTimeout(endGameTimeoutRef.current);
      }
    };
  }, []);

  const containerRef = useKeyBoardControl("Space", (event: KeyboardEvent) => {
    if (state.gameStatus === "playing" && !animationCompletedRef.current) {
      event.preventDefault();
      handleSmoothlyStop(durationRef.current);
    }
  });

  /** 애니메이션의 움직인 거리(x좌표값)가 바뀔 때 마다 km를 계산 */
  useEffect(() => {
    const unsubscribeFrontX = frontX.onChange((latest) => {
      calculateDistance(latest);
    });

    return () => unsubscribeFrontX();
  }, [frontX]);

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden focus:outline-none" tabIndex={-1}>
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
        onAnimationComplete={() => {
          if (firstCompleteBlockRef.current) {
            teller(action.gameEnd, getRacingGameTopRateStory, { distance: state.distance });
          }else {
            firstCompleteBlockRef.current = true
          }
        }}
      />
      <Lottie
        lottieRef={lottieRef}
        animationData={animationGame315}
        loop={true}
        autoplay={false}
        className="absolute top-[485px] left-[250px] w-[350px] h-auto z-[3]"
      />
      {gameContent(state.gameStatus, state.distance, state.topRate, handlePlayGame, enterEvent)}
      {gameMenu(state.gameStatus, shareGameScore)}
      {showMessage && (
          <div className={`absolute left-1/2 top-1/2 z-50 transform -translate-x-1/2 text-white bg-[#1C1A1B] border-gray-600 border-4 px-6 py-3 rounded-2xl transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-center items-center text-[24px] text-center font-galmuri font-bold">
              URL이 복사되었습니다!
              <br/>
              당신의 기록을 공유해보세요!
            </div>
          </div>
        )}
    </div>
  );
};

/** 게임 상태에 따라 다르게 보여지는 콘텐츠 */
const gameContent = (
  gameStatus: string,
  distance: number,
  topRate: number,
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
                {`상위 ${topRate.toFixed(3)}%`}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center mt-2 space-x-4">
            <button onClick={enterEvent}>
              <img
                className="h-[50px]"
                src="/assets/enterEventBtn.svg"
                alt="enterEventBtn"
              />
            </button>
            <button onClick={handlePlayGame}>
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
const gameMenu = (
  gameStatus: string,
  shareGameScore: () => void,
) => {
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
          <button onClick={shareGameScore}>
            기록 자랑하기
          </button>
          <Link to="/racecasper">
            <button>게임 종료</button>
          </Link>
        </div>
      );
    default:
      return null;
  }
};

export default RacingGame;