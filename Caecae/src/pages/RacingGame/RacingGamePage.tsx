import { useEffect } from "react";
import { action as overlayAction } from "../../jobs/Overlay/OverlayWork";
import { OverLay, OverLayContent } from "../../components/common/Overlay/index";
import { store, useWork } from "../../shared/Hyundux";
import RacingGame from "../../components/RacingGame/index";
import { initRacingGameState, racingGameReducer } from "../../jobs/RacingGame/RacingGameWork";
import SelectCustom from "./Enter/SelectCustom";
import EnterComplete from "./Enter/EnterComplete";
import PhoneNumberOverlayRacingGame from "../../components/PhoneNumberOverlay/PhoneNumberOverlayRacingGame";

const RacingGamePage = () => {
  const [state, dispatch] = useWork(initRacingGameState, racingGameReducer);

  useEffect(() => {
    if (state.gameStatus === "enterEvent") {
      store.dispatch(overlayAction.toggleOverlay());
    }
  }, [state.gameStatus]);

  return (
    <div className="flex flex-row h-full relative">
      <OverLay>
        <OverLayContent index={0} element={<PhoneNumberOverlayRacingGame />} />
        <OverLayContent index={1} element={<SelectCustom />} />
        <OverLayContent index={2} element={<EnterComplete />} />
      </OverLay>
      <RacingGame />
    </div>
  );
};
export default RacingGamePage;
