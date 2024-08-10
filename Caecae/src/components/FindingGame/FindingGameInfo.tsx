import { useState } from "react";
import { initFindingGameState } from "../../jobs/FindingGame/FindingGameWork";
import { useExistState } from "../../shared/Hyundux/index";
import SmileBadge from "../common/SmileBadge/index";

function modeDependency(mode: string): {
  findingWord: string;
  tooltipTitle: string;
  tooltipContent: string;
} {
  if (mode === "pixel") {
    return {
      findingWord: "숨겨진 픽셀",
      tooltipTitle: "픽셀 디자인",
      tooltipContent: "픽셀처럼 사각형 모양을 띄고 있는 디자인입니다.",
    };
  } else {
    return {
      findingWord: "숨겨진 로봇 뱃지",
      tooltipTitle: "로봇 뱃지와 유사한 디자인",
      tooltipContent: "커다랗고 동그란 두 눈이 특징입니다.",
    };
  }
}

const FindingGameInfo = () => {
  const state = useExistState(initFindingGameState);
  const [isTooltipShowing, setIsTooltipShowing] = useState(false);
  state;
  function clickToolTip() {
    setIsTooltipShowing((prev) => !prev);
  }

  const modeData = modeDependency("pixel");

  const tooltip = isTooltipShowing ? (
    <>
      <div className="shadow-[0px_6px_10px_0px_rgba(0,0,0,0.15)] w-full bg-[#F7F7F7] rounded-lg relative mt-[16px] leading-[150%]">
        <img
          src="/public/assets/xButton.svg"
          className="absolute w-[16px] h-[16px] right-[14px] top-[14px]"
          onClick={clickToolTip}
        />
        <div className="p-6">
          <div className="absolute left-5 top-[-10px] w-0 h-0 border-b-[10px] border-r-[10px] border-r-transparent border-l-[10px] border-l-transparent bg-transparent border-[#F7F7F7]"></div>
          캐스퍼 일렉트릭의 핵심 디자인 요소로
          <br />
          {modeData.tooltipContent}
        </div>
      </div>
    </>
  ) : (
    <></>
  );

  const badges = state.answers.map((answer, index) => {
    const badgeType = index == 0 ? "blue" : "orange";
    if (
      state.showingAnswers.filter(
        (showingAnswer) => showingAnswer.id == answer.id
      ).length !== 0
    ) {
      return (
        <SmileBadge
          key={answer.id}
          isSelected={true}
          badgeType={badgeType}
          width={110}
        />
      );
    } else {
      return (
        <SmileBadge
          key={answer.id}
          isSelected={false}
          badgeType={badgeType}
          width={110}
        />
      );
    }
  });

  return (
    <>
      <div>
        <p className="font-galmuri text-l text-[#1C1A1B]">나를 찾아봐 이벤트</p>
        <p className="text-3xl leading-normal weight font-black text-[#1C1A1B]">
          왼쪽에 캐스퍼 일렉트릭에서
          <br />
          <span className="text-[#00AAD2]">{modeData.findingWord} 2개</span>를
          찾아주세요!
        </p>
        <div className="text-[#626262] flex">
          <div
            className="text-[#444444] font-bold border-b-2 border-b-[black] border-solid flex"
            onClick={clickToolTip}
          >
            {modeData.tooltipTitle}
            <img
              src="/public/assets/questionIcon.svg"
              alt="hyundaiLogo"
              width={15}
              height={15}
              className="ml-0.5 mr-0.5"
            />
          </div>
          이 들어간 요소가 숨어있어요.
        </div>
        {tooltip}
        <div className="bg-[#F7F7F7] rounded-[20px]">
          <div className="flex justify-center items-center gap-6 pt-[30px] pb-[30px] mt-[20px]">
            {badges}
          </div>
        </div>
        {state.showingHint.length != 0 ? (
          <div className="flex justify-center items-center">
            <img src="/public/assets/hintTalk.svg" alt="hintTalk" />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FindingGameInfo;
