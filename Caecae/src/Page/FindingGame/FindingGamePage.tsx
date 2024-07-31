import { useEffect } from "react";
import FindingGame from "../../Component/FindingGame/FindingGame";
import FindingGameInfo from "../../Component/FindingGame/FindingGameInfo";
import {
  findingGameReducer,
  initFindingGameState,
} from "../../Job/FindingGame/FindingGame";
import { action as overlayAction } from "../../Job/Overlay/OverlayWork";
import useWork from "../../Shared/Hyundux/Hooks/useWork";
import OverLay from "../../Widget/Overlay/Overlay";
import OverLayContent from "../../Widget/Overlay/OverlayContent";
import EnterContent from "./Enter/EnterContent";
import store from "../../Shared/Hyundux/Store";

const FindingGamePage = () => {
  const gameState = useWork(initFindingGameState, findingGameReducer);

  useEffect(() => {
    if (gameState.showingAnswers.length === 2) {
      store.dispatch(overlayAction.toggleOverlay());
    }
  }, [gameState.showingAnswers.length]);

  return (
    <div className="flex flex-row h-full relative">
      <OverLay>
        <OverLayContent
          index={0}
          element={
            <EnterContent
              title="축하합니다."
              content="캐스퍼 찾기 이벤트에 당첨되셨습니다. 전화번호를 입력하고 쿠폰을 받아가세요"
              badgeType={1}
              isWaringTextShowing={true}
              buttonText="전화번호 입력하러가기"
            />
          }
        />
      </OverLay>
      <div className="w-[66%] h-full">
        <FindingGame />
      </div>
      <div className="grow h-full flex justify-center items-center">
        <FindingGameInfo />
      </div>
    </div>
  );
};
export default FindingGamePage;
