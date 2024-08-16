import { ReactNode, useEffect } from "react";
import { FindingGame, FindingGameInfo } from "../../components/FindingGame";
import {
  findingGameReducer,
  initFindingGameState,
} from "../../jobs/FindingGame/FindingGameWork";
import { action as overlayAction } from "../../jobs/Overlay/OverlayWork";
import { OverLay, OverLayContent } from "../../components/common/Overlay/index";
import EnterContent from "./Enter/EnterContent";
import { store, useWork } from "../../shared/Hyundux";
import FailContent from "./Enter/FailContent";
import SuccessEnterContent from "./Enter/SuccessEnterContent";
import FindingGameResult from "../../components/FindingGame/FindingGameResult";
import PhoneNumberOverlay from "../../components/PhoneNumberOverlay/PhoneNumberOverlay";
import huynxios from "../../shared/Hyunxios";

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

  let content: ReactNode | null = null;
  if (gameState.gameStatus == "DoneSuccess") {
    console.log(gameState.gameStatus);
    content = (
      <OverLay>
        <OverLayContent index={0} element={<EnterContent />} />
        <OverLayContent
          index={1}
          element={
            <PhoneNumberOverlay
              type="findCasper"
              onClick={async (phoneNumber) => {
                await huynxios.post("/api/finding/register", {
                  ticketId: gameState.ticketId,
                  phone: phoneNumber,
                });
              }}
            />
          }
        />
        <OverLayContent index={2} element={<SuccessEnterContent />} />
      </OverLay>
    );
  } else if (gameState.gameStatus == "DoneFail") {
    console.log(gameState.gameStatus);
    content = (
      <OverLay>
        <OverLayContent index={0} element={<FailContent />} />
      </OverLay>
    );
  }
  console.log(gameState.gameStatus);

  return (
    <div className="relative flex flex-row h-full">
      {content}
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
