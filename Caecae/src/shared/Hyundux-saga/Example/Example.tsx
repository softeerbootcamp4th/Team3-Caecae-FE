import { createStory, Story } from "../Story";
import huynxios from "../../Hyunxios";
import { Action } from "../../Hyundux/Actions";
import useSaga from "../useSaga";
import { createState } from "../../Hyundux/State";
import { makePayLoad } from "../../Hyundux/Util/StoreUtil";
import Reducer from "../../Hyundux/Reducer";
import useWork from "../../Hyundux/Hooks/useWork";
import { useEffect } from "react";
import { SagaAction } from "../Saga";

// storyExample
interface HealthCheckDTO {
  responseCode: number;
  message: string;
  data: string;
}

const HealthCheckStory: Story = async () => {
  const response = await huynxios.get<HealthCheckDTO>("/api/health");
  return response;
};

// test component
const TestComponent = () => {
  const [state, store] = useWork(initTestState, countReducer);
  const [status, teller] = useSaga();
  store;
  useEffect(() => {
    setTimeout(() => {
      const testStory = createStory(HealthCheckStory, {});
      teller(action.init, testStory);
    }, 5000);
  }, []);

  let content = <p> is Loading... </p>;
  if (status == "isSuccess") {
    content = <p>{state.data}</p>;
  } else if (status == "isError") {
    content = <p>"fuck error"</p>;
  }

  return content;
};

export { TestComponent };

// Test Work-------------------------------------------
const WORKFLOW_NAME = "Test";

// state type
interface TestPayLoad {
  data: string;
}

const initTestState = createState<TestPayLoad>(WORKFLOW_NAME, {
  data: "",
});

// define reducer
const countReducer: Reducer<TestPayLoad> = {
  type: WORKFLOW_NAME,
  reducer: async function reducer(state, action) {
    switch (action.actionName) {
      case "init": {
        const actionPayLoad = (action.payload || {}) as { data: string };
        return makePayLoad(state, { data: actionPayLoad.data });
      }
      default:
        return state;
    }
  },
};

// actions
const action: { init: SagaAction } = {
  init: (request?: object): Action => {
    const parameter = request as { data: string };
    return {
      type: WORKFLOW_NAME,
      actionName: "init",
      payload: {
        data: parameter.data,
      },
    };
  },
};
