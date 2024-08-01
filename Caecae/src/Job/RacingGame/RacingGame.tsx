import { createState } from "../../Shared/Hyundux/State"; 
import { makePayLoad } from "../../Shared/Hyundux/Util/StoreUtil";
import Reducer from "../../Shared/Hyundux/Reducer"; 
import { Action } from "../../Shared/Hyundux/Actions";

const WORKFLOW_NAME = "RacingGaame";

// state type
interface CountPayLoad {
  gameStatus: number; // 0 none 1 state 2 pause
  score: number;
}

const initCountState = createState<CountPayLoad>(WORKFLOW_NAME, {
    gameStatus: 0,
    score: 0,
});

// define reducer
const countReducer: Reducer<CountPayLoad> = {
  type: WORKFLOW_NAME,
  reducer: async function reducer(state, action) {
    const payLoad = state.payload;
    switch (action.actionName) {
      case "gameStart":
        return makePayLoad(state, { gameStatus: 1 });
      case "countDown":
        return makePayLoad(state, { count: payLoad.count - 1 });
      case "upScroe": {
        if(score)
        const actionPayLoad = (action.payload || {}) as { text: string };
        return makePayLoad(state, { score: payLoad.score + 1 });
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
  gamePause: (): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "gamePauses",
    };
  },
  getText: (text: string): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "getText",
      payload: {
        text: text,
      },
    };
  },
};

export { action, initCountState, countReducer };
