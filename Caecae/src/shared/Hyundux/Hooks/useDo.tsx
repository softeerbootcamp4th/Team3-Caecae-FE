import { useState } from "react";
import _State from "../State";
import store from "../Store";

function useDo<PayLoad>(initialState: _State<PayLoad>): PayLoad {
  const [state, setState] = useState<_State<PayLoad>>(initialState);
  store.subscribe(state, null, (newState) => {
    setState(newState);
  });
  return state.payload;
}

export default useDo;
