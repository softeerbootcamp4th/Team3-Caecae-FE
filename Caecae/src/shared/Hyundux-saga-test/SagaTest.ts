import { Saga, SagaAction} from "../Hyundux-saga/Saga"
import { Story } from "../Hyundux-saga/Story";
import { HyunduxTest } from "../Hyundux-test/Tester";
import State, { createState } from "../Hyundux/State";

type MockStory = (request: object) => Promise<object>;


export class SagaTest<T> {
  saga: Saga;
  currentState: State<T>
  currentAction: SagaAction
  currentStory: Story
  currentParameter: object
  constructor(tester: HyunduxTest<T>) {
    this.saga = new Saga(tester.store)
    this.currentState = this.saga.store.states[0] as State<T>
  }

  given(givenPayload: T) {
    if (this.saga !== null) {
      this.currentState = createState(this.currentState.type, givenPayload);
    }
    return this;
  }

  when(action: SagaAction, story: Story, parameter: object) {
    this.currentAction = action
    this.currentStory = story
    this.currentParameter = parameter

    return this
  }

  async then(expectedPayload: T, isTrue: boolean = true){
    await this.saga.run(this.currentAction, this.currentStory, this.currentParameter)
    const result = this.saga.store.states[0]
    if(isTrue){
      expect(result.payload).toEqual(expectedPayload);
    }
    else {
      expect(result.payload).not.toEqual(expectedPayload);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const createSagaTester = <T,>(tester :HyunduxTest<T>) => {
  return new SagaTest(tester)
}
