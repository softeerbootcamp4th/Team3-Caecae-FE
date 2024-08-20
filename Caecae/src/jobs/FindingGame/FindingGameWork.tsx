import {
  createState,
  makePayLoad,
  Action,
  Reducer,
  State,
} from "../../shared/Hyundux";
import {
  _Position,
  GetFindFAmeIsAnswerBodyParameter,
  getFindGameIsAnswerDTO,
} from "../../stories/getFindGameIsAnswer";
import { FindGame } from "../../stories/getFindingGame";
import Response from "../../utils/Response";

import { CorrectAnswer } from "../../stories/getFindGameIsAnswer";
import huynxios from "../../shared/Hyunxios";
import { SagaActionPayload } from "../../shared/Hyundux-saga/Saga";

const WORK_NAME = "FindingGame";

// state type
interface FindingGamePayLoad {
  imageURL: "";
  gameType: "PIXEL" | "BADGE";
  gameStatus: "Gaming" | "DoneSuccess" | "DoneFail";
  answerIndex: number;
  ticketId: string;
  showingAnswers: CorrectAnswer[];
  wrongAnswers: { id: number; y: number; x: number }[];
  showingHint: CorrectAnswer[];
}

const initFindingGameState = createState<FindingGamePayLoad>(WORK_NAME, {
  imageURL: "",
  gameType: "PIXEL",
  gameStatus: "Gaming",
  answerIndex: 0,
  ticketId: "-1",
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
        const actionPayload = action.payload as Response<FindGame>;
        return makePayLoad(state, {
          imageURL: actionPayload.data.info.questionImageUrl,
          gameType: actionPayload.data.info.answerType,
        });
      }
      case "click": {
        interface Request {
          y: number;
          x: number;
          width: number;
          heght: number;
        }

        const actionPayLoad = action.payload as SagaActionPayload;
        const request =
          actionPayLoad.request as GetFindFAmeIsAnswerBodyParameter;
        const response =
          actionPayLoad.response as Response<getFindGameIsAnswerDTO>;
        const reponseData = response.data;
        if (
          state.payload.showingAnswers.length !=
          reponseData.correctAnswerList.length
        ) {
          if (reponseData.correctAnswerList.length == 2) {
            return makePayLoad(state, {
              ticketId: reponseData.ticketId,
              gameStatus:
                reponseData.ticketId === "-1" ? "DoneFail" : "DoneSuccess",
              showingAnswers: reponseData.correctAnswerList,
            });
          }
          return makePayLoad(state, {
            showingAnswers: reponseData.correctAnswerList,
          });
        }

        return makePayLoad(state, {
          wrongAnswers: [
            ...state.payload.wrongAnswers,
            {
              id: Math.round(Math.random() * 1000),
              y: request.answerList[request.answerList.length - 1].positionY,
              x: request.answerList[request.answerList.length - 1].positionX,
            },
          ],
        });
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
      // case "showHint": {
      //   if (state.payload.showingAnswers.length < 2) {
      //     const idsInAnswers = new Set(
      //       state.payload.showingAnswers.map((item) => item.id)
      //     );
      //     const newHints = state.payload.answers.filter(
      //       (item) => !idsInAnswers.has(item.id)
      //     );
      //     const newShowingHints = [newHints[0]];
      //     return makePayLoad(state, { showingHint: newShowingHints });
      //   }
      //   return state;
      // }
      case "changeShowingAnswer": {
        const actionPayLoad = (action.payload || {}) as {
          answerIndex: number;
        };

        return makePayLoad(state, { answerIndex: actionPayLoad.answerIndex });
      }
      default:
        return state;
    }
  },
};

// actions
const action = {
  init: (payLoad: SagaActionPayload): Action => {
    const reponse = payLoad.response as Response<FindGame>;
    return {
      type: WORK_NAME,
      actionName: "init",
      payload: reponse,
    };
  },
  click: (payLoad: SagaActionPayload): Action => {
    return {
      type: WORK_NAME,
      actionName: "click",
      payload: payLoad,
    };
  },
  checkAnswer: (object: object): Action => {
    const payLoad = object as Response<getFindGameIsAnswerDTO>;
    return {
      type: WORK_NAME,
      actionName: "checkAnswer",
      payload: payLoad,
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
  changeShowingAnswer: (index: number): Action => {
    return {
      type: WORK_NAME,
      actionName: "changeShowingAnswer",
      payload: {
        answerIndex: index,
      },
    };
  },
};
export function genrateFindGameAnswerCheckBodyParameter(
  state: FindingGamePayLoad,
  y: number,
  x: number,
  width: number,
  height: number
) {
  const result = state.showingAnswers.map((answer) => {
    return {
      positionY: answer.positionY,
      positionX: answer.positionX,
    } as _Position;
  });
  return {
    answerList: [...result, { positionY: y / height, positionX: x / width }],
  } as GetFindFAmeIsAnswerBodyParameter;
}

export { action, initFindingGameState, findingGameReducer };
