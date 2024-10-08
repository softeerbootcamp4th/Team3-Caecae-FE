import { useEffect, useState } from "react";
import { action as overlayAction } from "../../jobs/Overlay/OverlayWork";
import { OverLay, OverLayContent } from "../../components/common/Overlay/index";
import { store, useWork } from "../../shared/Hyundux";
import RacingGame from "../../components/RacingGame/index";
import {
  initRacingGameState,
  racingGameReducer,
} from "../../jobs/RacingGame/RacingGameWork";
import SelectCustom from "./Enter/SelectCustom";
import EnterComplete from "./Enter/EnterComplete";
import PhoneNumberOverlay from "../../components/PhoneNumberOverlay";
import huynxios from "../../shared/Hyunxios";
import Response from "../../utils/Response";

const RacingGamePage = () => {
  const [state, dispatch] = useWork(initRacingGameState, racingGameReducer);
  const [phoneNumber, setPhoneNumber] = useState("");
  dispatch;

  useEffect(() => {
    if (state.gameStatus === "enterEvent") {
      store.dispatch(overlayAction.toggleOverlay());
    }
  }, [state.gameStatus]);

  return (
    <div className="flex flex-row h-full relative">
      <OverLay>
        <OverLayContent
          index={0}
          element={
            <PhoneNumberOverlay
              type="raceCasper"
              submitNumber={async (phoneNumber, action) => {
                const response = await huynxios.post<
                  Response<{ isOptionSelected: boolean; distance: number }>
                >("/api/racing/result", {
                  phone: phoneNumber,
                  distance: state.distance,
                });
                console.log(response);
                setPhoneNumber(phoneNumber);
                store.dispatch(action(response.data.isOptionSelected ? 2 : 1));
              }}
            />
          }
        />
        <OverLayContent
          index={1}
          element={<SelectCustom phoneNumber={phoneNumber} />}
        />
        <OverLayContent index={2} element={<EnterComplete />} />
      </OverLay>
      <RacingGame />
    </div>
  );
};
export default RacingGamePage;
