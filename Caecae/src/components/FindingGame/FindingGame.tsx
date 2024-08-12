import PictureGameBoard from "../common/PictureGameBoard/index.tsx";
import {
  action,
  initFindingGameState,
} from "../../jobs/FindingGame/FindingGameWork.tsx";
import { useEffect, useRef } from "react";
import LottieContainer from "../common/LottieContainer/index.tsx";
import correctLottie from "@assets/animationCorrect.json";
import wrongLottie from "@assets/animationIncorrect.json";
import { store, useExistState } from "../../shared/Hyundux";
import HintSpot from "./Hint/HintSpot.tsx";
import SmileBadge from "../common/SmileBadge/index.tsx";

const FindingGame = () => {
  const state = useExistState(initFindingGameState);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    store.dispatch(action.init());
    timerId.current = setTimeout(() => {
      store.dispatch(action.showHint());
    }, 40000);
  }, []);

  useEffect(() => {
    if (state.showingHint.length == 0) {
      if (timerId.current != null) {
        clearInterval(timerId.current);
      }
      timerId.current = setTimeout(() => {
        store.dispatch(action.showHint());
      }, 40000);
    }
  }, [state.showingHint]);

  const imgURL =
    "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/01/b57fdda5-3996-430f-8bf2-65052b1d12b2.jpg";

  const onClickAction = (
    width: number,
    heigjht: number,
    y: number,
    x: number
  ) => {
    width;
    heigjht;
    if (state.gameStatus == "Gaming") {
      store.dispatch(action.click(y, x));
    }
  };

  const lottieWidth = 120;
  const lottieHeight = 120;

  const showingCorrectElements = state.showingAnswers.map((answer) => {
    if (state.gameStatus == "Gaming") {
      return (
        <LottieContainer
          key={answer.id}
          x={answer.x}
          y={answer.y}
          width={lottieWidth}
          height={lottieHeight}
          jsonFile={correctLottie}
        />
      );
    }
    return <></>;
  });

  const answerElement = state.answers.map((answer, index) => {
    if (state.gameStatus == "Done") {
      const left = answer.x - 50;
      const top = answer.y - 50;
      const rotateRadian = index == 0 ? "-13" : "8";
      const bageType = index == 0 ? "orange_line" : "yellow_line";
      return (
        <div
          key={index}
          style={{
            width: 100,
            left: `${left}px`,
            top: `${top}px`,
            position: "absolute",
            transform: `rotate(${rotateRadian}deg)`,
          }}
          onClick={() => {
            store.dispatch(action.changeShowingAnswer(index));
          }}
        >
          <SmileBadge width={200} badgeType={bageType} />
        </div>
      );
    }
    return <></>;
  });

  const showingWrongElement = state.wrongAnswers.map((wrongAnswer) => {
    return (
      <LottieContainer
        key={wrongAnswer.id}
        x={wrongAnswer.x}
        y={wrongAnswer.y}
        width={lottieWidth}
        height={lottieHeight}
        jsonFile={wrongLottie}
        onAnimationEnd={() => {
          store.dispatch(action.removeWrongAnswer(wrongAnswer.id));
        }}
      />
    );
  });
  const showingHintElement = state.showingHint.map((hintAnswer) => {
    return <HintSpot y={hintAnswer.y} x={hintAnswer.x} />;
  });

  return (
    <div>
      <PictureGameBoard
        imageURL={imgURL}
        showingElements={[
          ...showingCorrectElements,
          ...showingWrongElement,
          ...showingHintElement,
          ...answerElement,
        ]}
        onClickAction={onClickAction}
      />
    </div>
  );
};

export default FindingGame;
