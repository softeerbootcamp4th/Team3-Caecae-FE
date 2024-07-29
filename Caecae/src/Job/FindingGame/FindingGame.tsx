import { createState } from "../../Shared/Hyundux/State";
import { makePayLoad } from "../../Shared/Hyundux/Util/StoreUtil";
import Reducer from "../../Shared/Hyundux/Reducer";
import { Action } from "../../Shared/Hyundux/Actions";
import FindingGameAnswer from "../../Shared/Types/FindingGameAnswer";

const WORKFLOW_NAME = "FindingGame";

// state type
interface FindingGamePayLoad {
  answers: FindingGameAnswer[];
  showingAnswers: FindingGameAnswer[];
}

const initFindingGameState = createState<FindingGamePayLoad>(WORKFLOW_NAME, {
  answers: [],
  showingAnswers: [],
});

// define reducer
const findingGameReducer: Reducer<FindingGamePayLoad> = {
  type: WORKFLOW_NAME,
  reducer: async function reducer(state, action) {
    const payLoad = state.payload;
    switch (action.actionName) {
      case "init": {
        //  실제로는 여기서 비동기로 answer fetch해야함
        const fetchedAnswers: FindingGameAnswer[] = [
          { id: Math.random(), y: 100, x: 100, imageURL: null, info: null },
        ];
        return makePayLoad(state, { answers: fetchedAnswers });
      }
      case "click": {
        const actionPayLoad = (action.payload || {}) as {
          y: number;
          x: number;
        };
        const showingAnswers: FindingGameAnswer[] = [...payLoad.showingAnswers];
        payLoad.answers.forEach((answer) => {
          if (
            calculateRange(answer.y, answer.x, actionPayLoad.y, actionPayLoad.x)
          ) {
            showingAnswers.push({
              id: Math.random(),
              y: answer.y,
              x: answer.x,
              imageURL: null,
              info: null,
            });
          }
        });
        return makePayLoad(state, { showingAnswers: showingAnswers });
      }
      default:
        return state;
    }
  },
};

// actions
const action = {
  init: (): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "init",
    };
  },
  click: (y: number, x: number): Action => {
    return {
      type: WORKFLOW_NAME,
      actionName: "click",
      payload: {
        y: y,
        x: x,
      },
    };
  },
};

const calculateRange = (
  answerY: number,
  answerX: number,
  clickedY: number,
  clickedX: number
) => {
  return (
    Math.sqrt(
      Math.pow(answerY - clickedY, 2) + Math.pow(answerX - clickedX, 2)
    ) <= 100
  );
};

export { action, initFindingGameState, findingGameReducer };
