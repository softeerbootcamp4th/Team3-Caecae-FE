import useWork from "../Hooks/useWork";
import { action, initCountState, countReducer } from "./CountWork";
import store from "../Store";

const Counter = () => {
  const [state, dispatch] = useWork(initCountState, countReducer);

  function temp1() {
    dispatch;
    store.dispatch(action.countUp());
  }

  function temp2() {
    store.dispatch(action.getText("sdsd"));
    store.dispatch(action.countDown());
  }

  return (
    <div>
      <h1>{state.text}</h1>
      <div>{state.count}</div>
      <br></br>
      <button onClick={temp1}>up</button>
      <button onClick={temp2}>down</button>
    </div>
  );
};

export default Counter;
