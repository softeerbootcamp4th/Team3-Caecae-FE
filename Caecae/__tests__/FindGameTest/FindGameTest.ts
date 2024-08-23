import { act } from "react";
import {
  initFindingGameState,
  action,
  findingGameReducer,
} from "../../src/jobs/FindingGame/FindingGameWork";
import { Action } from "../../src/shared/Hyundux"
import createHynduxTester from "../../src/shared/Hyundux-test/Tester";

const tester = createHynduxTester(initFindingGameState, findingGameReducer);

test("changShowingAnswer__action_index_1__result_1_true", () => {
  const givenData = initFindingGameState.payload;
  const whenData: Action = action.changeShowingAnswer(1);
  const thenData = tester.makeThenPayload({ answerIndex: 1 })
  
  tester.given(givenData).when(whenData).then(thenData, true);
});

test("changShowingAnswer__action_index_2__result_1_false", () => {
  const givenData = initFindingGameState.payload;
  const whenData: Action = action.changeShowingAnswer(2);
  const thenData = tester.makeThenPayload({ answerIndex: 1 })
  
  tester.given(givenData).when(whenData).then(thenData, false);
});

