import PictureGameBoard from "../common/PictureGameBoard/index";
import {
  action,
  genrateFindGameAnswerCheckBodyParameter,
  initFindingGameState,
} from "../../jobs/FindingGame/FindingGameWork";
import { useEffect, useRef } from "react";
import LottieContainer from "../common/LottieContainer/index";
import correctLottie from "@assets/animationCorrect.json";
import wrongLottie from "@assets/animationIncorrect.json";
import { store, useExistState } from "../../shared/Hyundux";
import HintSpot from "./Hint/HintSpot";
import SmileBadge from "../common/SmileBadge/index";
import { createStory } from "../../shared/Hyundux-saga/Story";
import useSaga from "../../shared/Hyundux-saga/useSaga";
import { getFindGameStory } from "../../stories/FindingGame/getFindingGame";
import { getFindGameAnswerStory } from "../../stories/FindingGame/getFindGameIsAnswer";
import { getFindGameHintStory } from "../../stories/FindingGame/getFindGameHint";

const FindingGame = () => {
  const state = useExistState(initFindingGameState);
  const timerId = useRef<number | null>(null);
  const [status, teller] = useSaga();
  const pictureWidth = useRef(0);
  const pictureHeight = useRef(0);
  const hintTime = 40 * 1000; // 1000ms는 1초
  status;
  useEffect(() => {
    const getFindGameRunStory = createStory(getFindGameStory, {});
    teller(action.init, getFindGameRunStory);
    timerId.current = setTimeout(() => {
      teller(action.showHint, getFindGameHintStory, {
        answerList: state.showingAnswers.map((answer) => {
          return { positionX: answer.positionX, positionY: answer.positionY };
        }),
      });
    }, hintTime);
  }, []);

  useEffect(() => {
    if (timerId.current != null) {
      clearInterval(timerId.current);
    }
    timerId.current = setTimeout(() => {
      teller(action.showHint, getFindGameHintStory, {
        answerList: state.showingAnswers.map((answer) => {
          return { positionX: answer.positionX, positionY: answer.positionY };
        }),
      });
    }, hintTime);
  }, [state.showingAnswers]);

  useEffect(() => {
    if (state.showingHint.length == 0) {
      if (timerId.current != null) {
        clearInterval(timerId.current);
      }
      timerId.current = setTimeout(() => {
        teller(action.showHint, getFindGameHintStory, {
          answerList: state.showingAnswers.map((answer) => {
            return { positionX: answer.positionX, positionY: answer.positionY };
          }),
        });
      }, hintTime);
    }
  }, [state.showingHint]);

  const onClickAction = (
    width: number,
    height: number,
    y: number,
    x: number
  ) => {
    pictureWidth.current = width;
    pictureHeight.current = height;
    if (state.gameStatus == "Gaming") {
      teller(
        action.click,
        getFindGameAnswerStory,
        genrateFindGameAnswerCheckBodyParameter(state, y, x, width, height)
      );
    }
  };

  const lottieWidth = 120;
  const lottieHeight = 120;

  const showingCorrectElements = state.showingAnswers.map((answer) => {
    if (state.gameStatus == "Gaming") {
      return (
        <LottieContainer
          x={answer.positionX * pictureWidth.current}
          y={answer.positionY * pictureHeight.current}
          width={lottieWidth}
          height={lottieHeight}
          jsonFile={correctLottie}
        />
      );
    }
    return <></>;
  });

  const answerElement = state.showingAnswers.map((answer, index) => {
    if (state.gameStatus == "DoneSuccess" || state.gameStatus == "DoneFail") {
      const left = answer.positionX * pictureWidth.current - 50;
      const top = answer.positionY * pictureHeight.current - 50;
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
        x={wrongAnswer.x * pictureWidth.current}
        y={wrongAnswer.y * pictureHeight.current}
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
    return (
      <HintSpot
        y={hintAnswer.positionY * pictureHeight.current}
        x={hintAnswer.positionX * pictureWidth.current}
      />
    );
  });
  return (
    <div>
      <PictureGameBoard
        imageURL={state.imageURL}
        setRect={(width, height) => {
          pictureWidth.current = width;
          pictureHeight.current = height;
        }}
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
