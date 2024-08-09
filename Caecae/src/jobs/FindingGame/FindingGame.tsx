import {
  createState,
  makePayLoad,
  Action,
  Reducer,
} from "../../shared/Hyundux";

import FindingGameAnswer from "../../types/FindingGameAnswer";

const WORK_NAME = "FindingGame";

// state type
interface FindingGamePayLoad {
  gameStatus: "Gaming" | "Done";
  answerIndex: number;
  answers: FindingGameAnswer[];
  showingAnswers: FindingGameAnswer[];
  wrongAnswers: { id: number; y: number; x: number }[];
  showingHint: FindingGameAnswer[];
}

const initFindingGameState = createState<FindingGamePayLoad>(WORK_NAME, {
  gameStatus: "Gaming",
  answerIndex: 0,
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
          {
            id: Math.random(),
            y: 100,
            x: 100,
            imageURL:
              "https://cdn.newautopost.co.kr/newautopost/2024/07/09121310/%EC%BA%90%EC%8A%A4%ED%8D%BC-%EC%9D%BC%EB%A0%89%ED%8A%B8%EB%A6%AD-1.jpg",
            info: "알로이 휠은 강도가 높으면서도 무게가 가벼워 주행 성능과 연비를 개선하는 데 큰 도움을 줍니다. 픽셀 디자인의 휠은 캐스퍼 일렉트릭의 스타일을 돋보이게 합니다.",
            title: "17인치 알로이 휠 & 타이어",
          },
          {
            id: Math.random(),
            y: 500,
            x: 500,
            imageURL:
              "https://www.hyundai.co.kr/image/upload/asset_library/MDA00000000000052243/d91508780929423b9999a699bafe60aa.jpg",
            title: "전자식 공조 시스템",
            info: "풀 오토 에어컨이 적용된 전자식 공조 시스템을 통해 자동으로 오너가 원하는 온도로 풍량을 조절하여 쾌적한 실내를 유지합니다.",
          },
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
              imageURL: "",
              title: "",
              info: "",
            });
          }
        });
        if (isCorrect) {
          return makePayLoad(state, {
            gameStatus: showingAnswers.length == 2 ? "Done" : "Gaming",
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
