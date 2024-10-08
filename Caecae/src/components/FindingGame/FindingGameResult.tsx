import {
  action,
  initFindingGameState,
} from "../../jobs/FindingGame/FindingGameWork";
import { useExistState, store } from "../../shared/Hyundux/index";
import { Link } from "../../shared/Hyunouter";

const FindingGameResult = () => {
  const state = useExistState(initFindingGameState);
  const currentAnswer = state.showingAnswers[state.answerIndex];
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-10/12 mt-[80px]">
          <p className="font-galmuri">나를 찾아봐 이벤트</p>
          <p className="font-bold text-[28px] mt-[20px]">
            내가 찾은 캐스퍼들을 알아볼까요?
          </p>
        </div>
        <div className="relative w-full h-[280px] mt-[25px]">
          <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full">
            <div
              className="bg-[#000000] bg-opacity-50 w-[50px] h-[50px] flex justify-center items-center"
              onClick={() => {
                const index =
                  (state.showingAnswers.length + state.answerIndex - 1) %
                  state.showingAnswers.length;
                store.dispatch(action.changeShowingAnswer(index));
              }}
            >
              <img src="/assets/whiteLeftShevron.svg" />
            </div>
            <div
              className="bg-[#000000] bg-opacity-50 w-[50px] h-[50px] flex justify-center items-center"
              onClick={() => {
                const index =
                  (state.answerIndex + 1) % state.showingAnswers.length;
                store.dispatch(action.changeShowingAnswer(index));
              }}
            >
              <img src="/assets/whiteRightShevron.svg" />
            </div>
          </div>
          <img
            src={currentAnswer.descriptionImageUrl}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="w-10/12 mt-[20px]">
          <p className="font-bold text-[24px]">{currentAnswer.title}</p>
          <p className="mt-[25px]">{currentAnswer.content}</p>
        </div>
        <div className="flex-grow"></div>
        <div className="bg-[#002C5F] flex justify-center items-center w-10/12 py-[14px] mb-[40px]">
          <Link to="/findcasper">
            <p className="text-[white] font-bold text-[18px]">
              이벤트 홈으로 돌아가기
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FindingGameResult;
