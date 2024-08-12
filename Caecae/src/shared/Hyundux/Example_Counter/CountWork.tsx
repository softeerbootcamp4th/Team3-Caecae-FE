import { createState } from "../State";
import { makePayLoad } from "../Util/StoreUtil";
import Reducer from "../Reducer";
import { Action } from "../Actions";

const WORKFLOW_NAME = "Count";

// state type
interface CountPayLoad {
  count: number;
  text: string;
}

const initCountState = createState<CountPayLoad>(WORKFLOW_NAME, {
  count: 0,
  text: "helloWorld",
});

// define reducer
const countReducer: Reducer<CountPayLoad> = {
  type: WORKFLOW_NAME,
  reducer: async function reducer(state, action) {
    const payLoad = state.payload;
    switch (action.actionName) {
      case "countUp":
        return makePayLoad(state, { count: payLoad.count + 1 });
      case "countDown":
        return makePayLoad(state, { count: payLoad.count - 1 });
      case "getText": {
        const actionPayLoad = (action.payload || {}) as { text: string };
        return makePayLoad(state, { text: actionPayLoad.text });
      }
      default:
        return state;
    }
  },
};

// actions
const action = {
  countUp: (): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "countUp",
    };
  },
  countDown: (): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "countDown",
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
