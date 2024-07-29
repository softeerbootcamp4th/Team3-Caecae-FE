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
//import wrongLottie from "../Shared/assets/animationIncorrect.json";

const FindingGame = () => {
  const state = useWork(initFindingGameState, findingGameReducer);

  useEffect(() => {
    store.dispatch(action.init());
  }, []);

  const imgURL =
    "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/01/b57fdda5-3996-430f-8bf2-65052b1d12b2.jpg";

  const onClickAction = (y: number, x: number) => {
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

  // 틀린 X 들을 가지고 있는 배열
  // const showingWorngElement = state.showingAnswers.map((y, x) => {
  //   return (
  //     <LottieContainer
  //       key={Math.random()}
  //       x={x}
  //       y={y}
  //       width={200}
  //       height={200}
  //       jsonFile={correctLottie}
  //       onAnimationEnd={forceRerendering}
  //     />
  //   );
  // });

  return (
    <div>
      <PictureGameBoard
        imageURL={imgURL}
        showingElements={showingCorrectElements}
        onClickAction={onClickAction}
      />
    </div>
  );
};

export default FindingGame;
