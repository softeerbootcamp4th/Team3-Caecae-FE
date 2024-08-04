import { createState } from "../../Shared/Hyundux/State";
import { makePayLoad } from "../../Shared/Hyundux/Util/StoreUtil";
import Reducer from "../../Shared/Hyundux/Reducer";
import { Action } from "../../Shared/Hyundux/Actions";
import FindingGameAnswer from "../../Shared/Types/FindingGameAnswer";

const WORK_NAME = "FindingGame";

// state type
interface FindingGamePayLoad {
  hintIntervalId: NodeJS.Timeout | null;
  answers: FindingGameAnswer[];
  showingAnswers: FindingGameAnswer[];
  wrongAnswers: { id: number; y: number; x: number }[];
  showingHint: FindingGameAnswer[];
}

const initFindingGameState = createState<FindingGamePayLoad>(WORK_NAME, {
  hintIntervalId: null,
  answers: [],
  showingAnswers: [],
  wrongAnswers: [],
  showingHint: [],
});

// define reducer
const findingGameReducer: Reducer<FindingGamePayLoad> = {
  type: WORK_NAME,
  reducer: async function reducer(state, action) {
    const payLoad = state.payload;
    switch (action.actionName) {
      case "init": {
        //  실제로는 여기서 비동기로 answer fetch해야함
        const fetchedAnswers: FindingGameAnswer[] = [
          { id: Math.random(), y: 100, x: 100, imageURL: null, info: null },
          { id: Math.random(), y: 500, x: 500, imageURL: null, info: null },
        ];

        return makePayLoad(state, { answers: fetchedAnswers });
      }
      case "click": {
        const actionPayLoad = (action.payload || {}) as {
          id: number;
          y: number;
          x: number;
        };
        const showingAnswers: FindingGameAnswer[] = [...payLoad.showingAnswers];
        let isCorrect = false;
        payLoad.answers.forEach((answer) => {
          if (
            calculateRange(answer.y, answer.x, actionPayLoad.y, actionPayLoad.x)
          ) {
            isCorrect = true;
            showingAnswers.push({
              id: answer.id,
              y: answer.y,
              x: answer.x,
              imageURL: null,
              info: null,
            });
          }
        });
        if (isCorrect) {
          return makePayLoad(state, {
            showingAnswers: showingAnswers,
            showingHint: [],
          });
        } else {
          const _wrongAnswers: { id: number; y: number; x: number }[] = [
            ...payLoad.wrongAnswers,
          ];
          _wrongAnswers.push(actionPayLoad);
          return makePayLoad(state, { wrongAnswers: _wrongAnswers });
        }
      }
      case "removeWrongAnswer": {
        const actionPayLoad = (action.payload || {}) as {
          id: number;
        };
        const _wrongAnswers = payLoad.wrongAnswers.filter(
          (answer) => answer.id !== actionPayLoad.id
        );
        return makePayLoad(state, { wrongAnswers: _wrongAnswers });
      }
      case "showHint": {
        if (state.payload.showingAnswers.length < 2) {
          const idsInAnswers = new Set(
            state.payload.showingAnswers.map((item) => item.id)
          );
          const newHints = state.payload.answers.filter(
            (item) => !idsInAnswers.has(item.id)
          );
          const newShowingHints = [newHints[0]];
          return makePayLoad(state, { showingHint: newShowingHints });
        }
        return state;
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
      type: WORK_NAME,
      actionName: "init",
    };
  },
  click: (y: number, x: number): Action => {
    return {
      type: WORK_NAME,
      actionName: "click",
      payload: {
        id: Math.random(),
        y: y,
        x: x,
      },
    };
  },
  removeWrongAnswer: (id: number): Action => {
    return {
      type: WORK_NAME,
      actionName: "removeWrongAnswer",
      payload: {
        id: id,
      },
    };
  },
  showHint: (): Action => {
    return {
      type: WORK_NAME,
      actionName: "showHint",
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
