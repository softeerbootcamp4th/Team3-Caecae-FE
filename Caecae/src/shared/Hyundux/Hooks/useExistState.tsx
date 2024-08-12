import State from "../State";
import store from "../Store";

function useExistState<PayLoad>(initState: State<PayLoad>): PayLoad {
  return store.states.filter((state) => state.type == initState.type)[0]
    .payload as PayLoad;
}

export default useExistState;
