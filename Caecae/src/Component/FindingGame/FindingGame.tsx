import PictureGameBoard from "../../Widget/PictureGameBoard/PictureGameBoard";
import {
  action,
  initFindingGameState,
} from "../../Job/FindingGame/FindingGame.tsx";
import store from "../../Shared/Hyundux/Store.tsx";
import { useEffect, useRef } from "react";
import LottieContainer from "../../Widget/LottieContainer/LottieContainter.tsx";
import correctLottie from "../../Shared/assets/animationCorrect.json";
import wrongLottie from "../../Shared/assets/animationIncorrect.json";
import useExistState from "../../Shared/Hyundux/Hooks/useExistState.tsx";
import HintSpot from "./Hint/HintSpot.tsx";

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
    store.dispatch(action.click(y, x));
  };

  const lottieWidth = 120;
  const lottieHeight = 120;

  const showingCorrectElements = state.showingAnswers.map((answer) => {
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
        ]}
        onClickAction={onClickAction}
      />
    </div>
  );
};

export default FindingGame;
