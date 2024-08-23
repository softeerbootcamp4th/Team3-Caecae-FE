import {
  initFindingGameState,
  action,
  findingGameReducer,
} from "../../src/jobs/FindingGame/FindingGameWork";
import { Action } from "../../src/shared/Hyundux"
import createHynduxTester from "../../src/shared/Hyundux-test/Tester";

const tester = createHynduxTester(initFindingGameState, findingGameReducer);

test("결과보여지는 것들의 인덱스변경_입력값:1 -> 결과값 1 (옮은 테스트)", () => {
  const givenData = initFindingGameState.payload;
  const whenData: Action = action.changeShowingAnswer(1);
  const thenData = tester.makeThenPayload({ answerIndex: 1 })
  
  tester.given(givenData).when(whenData).then(thenData, true);
});

test("결과보여지는 것들의 인덱스변경_입력값:2 -> 결과값 1 (잘못된 테스트)", () => {
  const givenData = initFindingGameState.payload;
  const whenData: Action = action.changeShowingAnswer(2);
  const thenData = tester.makeThenPayload({ answerIndex: 1 })
  
  tester.given(givenData).when(whenData).then(thenData, false);
});

test("클릭 이벤트:입력값 [{x: 0.5 y: 0.5}, 틀린답 {x: 0.7, y: 0.1}] -> 결과값 answers.length == 1, answers = [answer{ x: 0.5. y: 0.5 }] (옳은 테스트)", () => {
  const givenData = initFindingGameState.payload;
  const whenData: Action = action.click({ request: {
    answerList: [
      { positionX: 0.5, positionY: 0.5 }
    ]
  }, response: {
      responseCode: 1000,
      message: "success",
      data: {
        ticketIryd: "1212",
        startTime: "asdsad",
        correctAnswerList: [
          {
            positionX: 0.5,
            positionY: 0.5,
            descriptionImageUrl: "",
            title: "",
            content: ""
          }
        ]
      }
  }})
  
  const thenData = tester.makeThenPayload({ showingAnswers: [{
    positionX: 0.5,
    positionY: 0.5,
    descriptionImageUrl: "",
    title: "",
    content: ""
  }] })
  
  tester.given(givenData).when(whenData).then(thenData, true);
});

test("클릭 이벤트:입력값 [{x: 0.5 y: 0.5}] -> 결과값 answers.length == 2, answers = [answer{ x: 0.5. y: 0.5 }] (옳은 테스트)", () => {
  const givenData = initFindingGameState.payload;
  const whenData: Action = action.click({ request: {
    answerList: [
      { positionX: 0.5, positionY: 0.5 },
    ]
  }, response: {
      responseCode: 1000,
      message: "success",
      data: {
        ticketIryd: "1212",
        startTime: "asdsad",
        correctAnswerList: [
          {
            positionX: 0.5,
            positionY: 0.5,
            descriptionImageUrl: "",
            title: "",
            content: ""
          }
        ]
      }
  }})
  
  const thenData = tester.makeThenPayload({ showingAnswers: [{
    positionX: 0.5,
    positionY: 0.5,
    descriptionImageUrl: "",
    title: "",
    content: ""
  }]})
  
  tester.given(givenData).when(whenData).then(thenData, true);
});

test("클릭 이벤트:입력값 [{x: 0.5 y: 0.5}, 맞은답 {x: 0.7, y: 0.1}] -> 결과값 answers.length == 2, answers = [answer{ x: 0.5. y: 0.5 }, {x: 0.7, y: 0.1}] (잘못된 테스트)", () => {
  console.log("gameStatuse가 바뀌어야함")
  console.log("tickerID도 바뀌어야함 바뀌어야함")
  const givenData = initFindingGameState.payload;
  const whenData: Action = action.click({ request: {
    answerList: [
      { positionX: 0.5, positionY: 0.5 },
      { positionX: 0.7, positionY: 0.1 },
    ]
  }, response: {
      responseCode: 1000,
      message: "success",
      data: {
        ticketIryd: "1212",
        startTime: "asdsad",
        correctAnswerList: [
          {
            positionX: 0.5,
            positionY: 0.5,
            descriptionImageUrl: "",
            title: "",
            content: ""
          },
          {
            positionX: 0.7,
            positionY: 0.1,
            descriptionImageUrl: "",
            title: "",
            content: ""
          }
        ]
      }
  }})
  
  const thenData = tester.makeThenPayload({ showingAnswers: [{
    positionX: 0.5,
    positionY: 0.5,
    descriptionImageUrl: "",
    title: "",
    content: ""
  },
  {
    positionX: 0.7,
    positionY: 0.1,
    descriptionImageUrl: "",
    title: "",
    content: ""
  }]})
  
  tester.given(givenData).when(whenData).then(thenData, false);
});
