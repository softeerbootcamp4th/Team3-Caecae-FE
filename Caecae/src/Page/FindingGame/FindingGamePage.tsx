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
import FailContent from "./Enter/FailContent";
import PhoneNumberOverlay from "../../Component/PhoneNumberOverlay/PhoneNumberOverlay";
import SuccessEnterContent from "./Enter/SuccessEnterContent";
import FindingGameResult from "../../Component/FindingGame/FindingGameResult";

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
