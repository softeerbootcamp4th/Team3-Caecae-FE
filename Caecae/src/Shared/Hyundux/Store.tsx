import { Action, DoAction } from "./Actions";
import State from "./State";
import Reducer from "./Reducer";
import removeFirst from "./Util/RemoveFirst";
import replaceFirst from "./Util/ReplaceFirst";

const store: {
  states: State<unknown>[];
  reducers: Reducer<unknown>[];
  subscribe: <PayLoad>(
    initState: State<PayLoad>,
    reducer: Reducer<PayLoad> | null,
    cb: (state: State<PayLoad>) => void
  ) => void;
  dispatch: <T>(action: Action | DoAction<T>) => void;
  publish: <PayLoad>(state: State<PayLoad>) => void;
  subscribeList: Map<string, <PayLoad>(state: State<PayLoad>) => void>;
} = {
  states: [],
  reducers: [],
  subscribeList: new Map(),
  dispatch: async function (action) {
    if (isAction(action)) {
      const reducer = this.reducers.filter(
        (reducer) => reducer.type == action.type
      )[0].reducer;
      const { removed, newArray } = removeFirst(
        this.states,
        (state) => state.type == action.type
      );
      const newState = await reducer(removed, action);
      // 여기서 모든것을 바로 state를 적용하는것이 아니라 이게 다른 state도 propagation하는지도 확인해야함
      this.states = [...newArray, newState];
      this.publish(newState);
    } else if (isDoAction(action)) {
      const { removed, newArray } = removeFirst(
        this.states,
        (state) => state.type == action.type
      );
      const newState = action.doing(removed);
      this.states = [...newArray, newState];
      this.publish(newState);
    }
  },
  publish: function (state) {
    const publishedCallBack = this.subscribeList.get(state.type);
    if (publishedCallBack !== undefined) {
      publishedCallBack(state);
    }
  },
  subscribe: function <PayLoad>(
    state: State<PayLoad>,
    reducer: Reducer<PayLoad> | null = null,
    cb: (state: State<PayLoad>) => void
  ) {
    this.states = replaceFirst(
      this.states,
      state,
      (element) => element.type == state.type
    );
    if (reducer != null) {
      this.reducers = replaceFirst(
        this.reducers,
        reducer as Reducer<unknown>,
        (element) => element.type == state.type
      );
    }
    this.subscribeList.set(state.type, cb as (state: State<unknown>) => void);
  },
};

function isAction(action: unknown): action is Action {
  return (action as Action).actionName !== undefined;
}

function isDoAction<T>(action: unknown): action is DoAction<T> {
  return (action as DoAction<T>).doing !== undefined;
}

export default store;
