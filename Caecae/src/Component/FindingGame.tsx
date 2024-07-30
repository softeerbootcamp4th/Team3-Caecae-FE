import PictureGameBoard from "../Widget/PictureGameBoard/PictureGameBoard";
import {
  action,
  initFindingGameState,
  findingGameReducer,
} from "../Job/FindingGame/FindingGame.tsx";
import useWork from "../Shared/Hyundux/Hooks/useWork.tsx";
import store from "../Shared/Hyundux/Store.tsx";
import { useEffect } from "react";
import LottieContainer from "../Widget/LottieContainer/LottieContainter.tsx";
import correctLottie from "../Shared/assets/animationCorrect.json";
import wrongLottie from "../Shared/assets/animationIncorrect.json";

const FindingGame = () => {
  const state = useWork(initFindingGameState, findingGameReducer);

  useEffect(() => {
    store.dispatch(action.init());
  }, []);

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

  const showingCorrectElements = state.showingAnswers.map((answer) => {
    return (
      <LottieContainer
        key={answer.id}
        x={answer.x}
        y={answer.y}
        width={200}
        height={200}
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
        width={200}
        height={200}
        jsonFile={wrongLottie}
        onAnimationEnd={() => {
          store.dispatch(action.removeWrongAnswer(wrongAnswer.id));
        }}
      />
    );
  });

  return (
    <div>
      <PictureGameBoard
        imageURL={imgURL}
        showingElements={[...showingCorrectElements, ...showingWrongElement]}
        onClickAction={onClickAction}
      />
    </div>
  );
};

export default FindingGame;
