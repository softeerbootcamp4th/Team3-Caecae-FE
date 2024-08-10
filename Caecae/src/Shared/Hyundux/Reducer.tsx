import State from "./State";
import { Action } from "./Actions";

interface Reducer<PayLoad> {
  type: string;
  // Todo : 여기 생각해보니 굳이 state를 뱉어주는건 reducer가 너무 복잡해질거 같아 그래서 그냥 Promise Payload를 리턴하는게 차라리 더 쉬울거 같아
  reducer: (state: State<PayLoad>, action: Action) => Promise<State<PayLoad>>;
}

export default Reducer;
