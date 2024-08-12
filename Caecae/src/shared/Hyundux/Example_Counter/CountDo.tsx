import { createState } from "../State";
import { DoAction } from "../Actions";
import State from "../State";
import { makePayLoad } from "../Util/StoreUtil";

const Do_NAME = "Count";

// state type
interface CountPayLoad {
  count: number;
  text: string;
}

const initCountState = createState<CountPayLoad>(Do_NAME, {
  count: 0,
  text: "helloWorld",
});

// actions
const doAction = {
  countUp: (): DoAction<CountPayLoad> => {
    return {
      type: Do_NAME,
      doing: (state: State<CountPayLoad>): State<CountPayLoad> => {
        return makePayLoad(state, { count: state.payload.count + 1 });
      },
    };
  },
};

export { doAction, initCountState };
