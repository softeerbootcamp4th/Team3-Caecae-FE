import { Action } from "../Hyundux/Actions";
import store, { Store } from "../Hyundux/Store";
import { createStory, Story } from "./Story";

export type SagaAction = (payLoad: SagaActionPayload) => Action;

export type SagaActionPayload = { response?: object; request?: object };

class Saga {
  store: Store | null = null;

  constructor(store: Store) {
    this.store = store;
  }
  async run(action: SagaAction, story: Story, parameter: object = {}) {
    try {
      const runStroy = createStory(story, parameter);
      const asyncResult = await runStroy();
      this.store?.dispatch(
        action({ request: parameter, response: asyncResult })
      );
    } catch (e) {
      console.log(`Saga error: ${e}`);
      throw "some story is problem";
    }
  }
}

const saga = new Saga(store);

export default saga;
