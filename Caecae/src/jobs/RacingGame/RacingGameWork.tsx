import { createState } from "../../shared/Hyundux/State";
import { makePayLoad } from "../../shared/Hyundux/Util/StoreUtil";
import Reducer from "../../shared/Hyundux/Reducer";
import { Action } from "../../shared/Hyundux/Actions";
import { SagaActionPayload } from "../../shared/Hyundux-saga/Saga";
import { RacingGameTopRateDTO } from "../../stories/getRacingGameTopRate";
import Response from "../../utils/Response";

const WORKFLOW_NAME = "RacingGame";

const km315 = 315;
const aniMovingDistance = 11990;

// state type
export interface RacingGamePayLoad {
  gameStatus: "previous" | "playing" | "end" | "enterEvent";
  topRate: number;
  distance: number;
  // phoneNumber: string;
}

const initRacingGameState = createState<RacingGamePayLoad>(WORKFLOW_NAME, {
  gameStatus: "previous",
  topRate: 0,
  distance: 0,
  // phoneNumber: "",
});

// define reducer
const racingGameReducer: Reducer<RacingGamePayLoad> = {
  type: WORKFLOW_NAME,
  reducer: async function reducer(state, action) {
    switch (action.actionName) {
      case "gameStart":
        return makePayLoad(state, { gameStatus: "playing" });
      case "gameEnd": {
        const payload = action.payload as { response: Response<RacingGameTopRateDTO> }
        const topRate = payload.response.data.percent
        return makePayLoad(state, { gameStatus: "end", topRate: topRate });
      };
      case "updateDistance": {
        const actionPayLoad = action.payload as { distance: number };
        // frontBackground 이미지가 애니메이션을 통해 이동한 거리를 실제 Km 단위로 변환해서 계산
        return makePayLoad(state, {
          distance: (actionPayLoad.distance / aniMovingDistance) * km315,
        });
      };
      case "enterEvent":
        return makePayLoad(state, { gameStatus: "enterEvent" });
      default:
        return state;
    }
  },
};

// actions
const action = {
  gameStart: (): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "gameStart",
    };
  },
  gameEnd: (payload: SagaActionPayload): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "gameEnd",
      payload: {
        response: payload.response
      }
    };
  },
  updateDistance: (distance: number): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "updateDistance",
      payload: {
        distance: distance,
      },
    };
  },
  enterEvent: (): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "enterEvent",
      payload: {
        // phoneNumber: phoneNumber,
      }
    };
  },
};

export { action, initRacingGameState, racingGameReducer };
