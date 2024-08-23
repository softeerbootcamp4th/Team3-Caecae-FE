import { createState, makePayLoad, Action } from "../../shared/Hyundux";
import Reducer from "../../shared/Hyundux/Reducer";

const WORK_NAME = "Overlay";

// state type
interface OverlayPayLoad {
  isShowing: boolean;
  index: number;
  isOnButton: boolean;
}

const initOverlayState = createState<OverlayPayLoad>(WORK_NAME, {
  isShowing: false,
  index: 0,
  isOnButton: false,
});

// define reducer
const overlayReducer: Reducer<OverlayPayLoad> = {
  type: WORK_NAME,
  reducer: async function reducer(state, action) {
    const payLoad = state.payload;
    switch (action.actionName) {
      case "toggleOverlay": {
        return makePayLoad(state, { isShowing: !payLoad.isShowing, index: 0 });
      }
      case "nextPage": {
        const actionPayload = action.payload as { amount: number };
        return makePayLoad(state, {
          index: payLoad.index + actionPayload.amount,
        });
      }
      default:
        return state;
    }
  },
};
// actions
const action = {
  toggleOverlay: (): Action => {
    return {
      type: WORK_NAME,
      actionName: "toggleOverlay",
    };
  },
  nextPage: (amount: number = 1): Action => {
    return {
      type: WORK_NAME,
      actionName: "nextPage",
      payload: {
        amount: amount,
      },
    };
  },
};

export { action, initOverlayState, overlayReducer };
