import { Action } from "../Hyundux/Actions";
import store, { Store } from "../Hyundux/Store";
import { RunStory } from "./Story";

class Saga {
  store: Store | null = null;

  constructor(store: Store) {
    this.store = store;
  }
  async run(action: (object: object) => Action, stories: RunStory[]) {
    try {
      const asyncResult = await Promise.all(
        stories.map(async (story) => {
          return await story();
        })
      );
      const newResult = asyncResult.reduce((originObject, newObject) => {
        return { ...originObject, ...newObject };
      }, {});
      this.store?.dispatch(action(newResult));
    } catch (e) {
      console.log(`Saga error: ${e}`);
      throw "some story is problem";
    }
  }
}

const saga = new Saga(store);

export default saga;
