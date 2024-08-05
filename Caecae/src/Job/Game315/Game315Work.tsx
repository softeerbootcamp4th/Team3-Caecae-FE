import { createState } from "../../Shared/Hyundux/State"; 
import { makePayLoad } from "../../Shared/Hyundux/Util/StoreUtil";
import Reducer from "../../Shared/Hyundux/Reducer"; 
import { Action } from "../../Shared/Hyundux/Actions";

const WORKFLOW_NAME = "Game315";

const km315 = 315;
const aniMovingDistance = 11990

// state type
interface game315PayLoad {
  gameStatus: String; // "previous", "playing", "end"
  distance: number;
}

const initGame315State = createState<game315PayLoad>(WORKFLOW_NAME, {
    gameStatus: "previous",
    distance: 0,
});

// define reducer
const game315Reducer: Reducer<game315PayLoad> = {
  type: WORKFLOW_NAME,
  reducer: async function reducer(state, action) {
    switch (action.actionName) {
      case "gameStart":
        return makePayLoad(state, { gameStatus: "playing" });
      case "gameEnd":
        return makePayLoad(state, { gameStatus: "end" });
      case "updateDistance": {
        const actionPayLoad = (action.payload) as { distance: number };
        // frontBackground 이미지가 애니메이션을 통해 이동한 거리를 실제 Km 단위로 변환해서 계산
        return makePayLoad(state, { distance: actionPayLoad.distance / aniMovingDistance * km315 });
      }
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
  gameEnd: (): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "gameEnd",
    };
  },
  updateDistance: (distance: number): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "updateDistance",
      payload: {
        distance: distance,
      }
    };
  },
};

export { action, initGame315State, game315Reducer };
