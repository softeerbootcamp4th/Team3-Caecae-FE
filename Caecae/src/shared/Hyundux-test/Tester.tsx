import State, { createState } from "../Hyundux/State";
import Reducer from "../Hyundux/Reducer";
import { createStore, Store } from "../Hyundux/Store";
import { Action } from "../Hyundux/Actions";

export class HyunduxTest<T> {
  store: Store | null = null;
  currentState: State<T> | null = null;
  currentAction: Action | null = null;
  resultState: State<T> | null = null;

  constructor(initState: State<T>, reducer: Reducer<T>) {
    this.store = createStore();
    this.currentState = initState;
    if (this.store !== null) {
      this.store.subscribe(initState, reducer, (newState) => {
        this.resultState = newState;
      });
    }
  }

  makeThenPayload(payLoad: object) {
    return { ...this.currentState.payload, ...payLoad };
  }

  given(givenPayload: T) {
    this.store.states = [createState(this.currentState.type, givenPayload)];
    if (this.store !== null && this.currentState !== null) {
      this.currentState = createState(this.currentState.type, givenPayload);
    }
    return this;
  }

  when(action: Action) {
    this.currentAction = action;
    return this;
  }

  async then<T>(expectedPayload: T, isTrue: boolean = true) {
    if (
      this.currentAction != null &&
      this.store !== null &&
      this.currentState !== null
    ) {
      this.store.states = [this.currentState];
      await this.store?.dispatch(this.currentAction);

      if (this.resultState !== null) {
        if (isTrue) {
          expect(this.resultState?.payload).toEqual(expectedPayload);
        } else {
          expect(this.resultState?.payload).not.toEqual(expectedPayload);
        }
      }
    }
  }
}

const createHyunduxTester = <T,>(initState: State<T>, reducer: Reducer<T>) => {
  return new HyunduxTest(initState, reducer);
};

export default createHyunduxTester;
