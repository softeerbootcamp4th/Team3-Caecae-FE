import { createState } from "../../Shared/Hyundux/State"; 
import { makePayLoad } from "../../Shared/Hyundux/Util/StoreUtil";
import Reducer from "../../Shared/Hyundux/Reducer"; 
import { Action } from "../../Shared/Hyundux/Actions";

const WORKFLOW_NAME = "315Game";

// state type
interface CountPayLoad {
  gameStatus: String; // "previous", "playing", "end"
  score: number;
}

const initGameStatusState = createState<CountPayLoad>(WORKFLOW_NAME, {
    gameStatus: "previous",
    score: 0,
});

// define reducer
const game315Reducer: Reducer<CountPayLoad> = {
  type: WORKFLOW_NAME,
  reducer: async function reducer(state, action) {
    const payLoad = state.payload;
    switch (action.actionName) {
      case "gameStart":
        return makePayLoad(state, { gameStatus: "playing" });
      case "gameEnd":
        return makePayLoad(state, { gameStatus: "end" });
      // case "updateScore": {
      //   if(score)
      //   const actionPayLoad = (action.payload || {}) as { text: string };
      //   return makePayLoad(state, { score: payLoad.score + 1 });
      // }
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
  // getText: (text: string): Action => {
  //   return {
  //     type: WORKFLOW_NAME,
  //     actionName: "getText",
  //     payload: {
  //       text: text,
  //     },
  //   };
  // },
};

export { action, initGameStatusState, game315Reducer };
