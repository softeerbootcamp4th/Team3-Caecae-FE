import { useState } from "react";
import HState from "../State";
import store from "../Store";
import Reducer from "../Reducer";

function useWork<PayLoad>(
  initialState: HState<PayLoad>,
  reducer: Reducer<PayLoad>
) {
  const [state, setState] = useState<HState<PayLoad>>(initialState);
  store.subscribe(state, reducer, (newState) => {
    setState(newState);
  });
  return [state.payload, store.dispatch] as const;
}

export default useWork;
