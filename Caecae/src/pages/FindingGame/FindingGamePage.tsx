import { useEffect } from "react";
import { FindingGame, FindingGameInfo } from "../../components/FindingGame";
import {
  findingGameReducer,
  initFindingGameState,
} from "../../jobs/FindingGame/FindingGame";
import { action as overlayAction } from "../../jobs/Overlay/OverlayWork";
import { OverLay, OverLayContent } from "../../components/common/Overlay/index";
import EnterContent from "./Enter/EnterContent";
import { store, useWork } from "../../shared/Hyundux";
import FailContent from "./Enter/FailContent";
import PhoneNumberOverlay from "../../components/PhoneNumberOverlay";
import SuccessEnterContent from "./Enter/SuccessEnterContent";
import FindingGameResult from "../../components/FindingGame/FindingGameResult";

const FindingGamePage = () => {
  const [gameState, dispatch] = useWork(
    initFindingGameState,
    findingGameReducer
  );
  dispatch;

  useEffect(() => {
    if (gameState.showingAnswers.length === 2) {
      // Todo: store 지우기
      store.dispatch(overlayAction.toggleOverlay());
    }
  }, [gameState.showingAnswers.length]);

  return (
    <div className="flex flex-row h-full relative">
      <OverLay>
        <OverLayContent index={0} element={<EnterContent />} />
        <OverLayContent index={1} element={<PhoneNumberOverlay />} />
        <OverLayContent index={2} element={<SuccessEnterContent />} />
        <OverLayContent index={3} element={<FailContent />} />
      </OverLay>
      <div className="w-[66%] h-full">
        <FindingGame />
      </div>
      <div className="w-[34%] h-screen flex justify-center items-center">
        {gameState.gameStatus == "Gaming" ? (
          <FindingGameInfo />
        ) : (
          <FindingGameResult />
        )}
      </div>
    </div>
  );
};
export default FindingGamePage;
