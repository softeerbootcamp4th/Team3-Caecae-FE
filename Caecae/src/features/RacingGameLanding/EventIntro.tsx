import { Link } from "../../shared/Hyunouter";

const EventIntro = () => {
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center relative">
        <div className="flex flex-col absolute z-20 items-center mt-20">
          <p className="text-[#B6B6B6] text-[22px]">
            <span className="text-white ">CASPER Electric </span>
            신차 출시 추첨 이벤트
          </p>
          <h1 className="flex items-center font-galmuri text-[white] text-[80px] font-bold my-2">
            전력으로...!
            <div className="relative inline-block ml-5">
              <span className="absolute inset-0 flex items-center justify-center text-black">
                315Km
              </span>
              <img
                src="/assets/background315km.svg"
                alt="background315km"
                className="block"
              />
            </div>
          </h1>
          <p className="text-white text-[24px] text-center">
            315km를 전력으로 질주하고
            <br />
            <span className="text-[#00AAD2]">캐스퍼 일렉트릭 </span>
            받아가자!
          </p>
          <img
            src="/assets/pixelCasper.svg"
            alt="pixelCasper"
            className="pr-10"
          />
          <div className="flex flex-row gap-6 justify-center items-center">
            <div
              className="bg-[#0609CD] w-[300px] h-[100px] flex flex-row justify-center items-center gap-3"
              onClick={shareEvent}
            >
              <img src="/assets/sharedButton.svg" alt="sharedButton" />
              <span className="text-white text-[24px]">공유하기</span>
            </div>
            <Link to="/racecaspergame">
              <div className="bg-white w-[300px] h-[100px] flex flex-row justify-center items-center gap-3">
                <span className="text-[24px]">전력 질주하러 가기</span>
                <img src="/public/assets/rightShevron.svg" alt="rightShevron" />
              </div>
            </Link>
          </div>
        </div>
        <div>
          <img
            src="/assets/backgroundGradation.svg"
            alt="backgroundGradation"
            className="absolute top-0 left-0 w-full h-screen object-cover object-bottom-center"
          />
          <img
            src="/assets/leftEffect.svg"
            alt="leftEffect"
            className="opacity-[70%] w-[350px] left-0 top-56 absolute z-10"
          />
          <img
            src="/assets/rightEffect.svg"
            alt="rightEffect"
            className="opacity-[70%] w-[230px] right-0 top-96 absolute z-10"
          />
        </div>
      </div>
    </>
  );
};
const shareEvent = () => {
  console.log("이벤트를 공유합니다!");
};

export default EventIntro;
