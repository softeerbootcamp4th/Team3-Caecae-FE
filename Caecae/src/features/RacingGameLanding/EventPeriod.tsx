import InfoSection from "../../components/common/InfoSection/index";

const EventPeriod = () => {
  return (
    <>
      <div className="relative h-[1100px] bg-black ">
        <div className="absolute inset-0 z-10 flex flex-col items-center w-full bg-[#00113F] bg-opacity-40">
          <h1 className="text-white font-[900] text-[40px] mt-16">
            이벤트 기간
          </h1>
          <div className="mt-14">
            <InfoSection title="7일간 매일매일">
              <div className="flex flex-col justify-center items-center py-[60px] px-[60px]">
                <p className="text-white text-center text-[24px] line-[140%]">
                  참여기간: 7.15(월) - 7.21(일)
                  <br />
                  당첨자 발표 날짜: 7.29(월)부터 주말ㆍ공휴일 제외 순차적으로
                  발송
                </p>
                <div className="my-16">
                  <img
                    src="/public/assets/eventPeriodBackground.svg"
                    alt="eventPeriodBackground"
                  />
                </div>
                <div className="mt-2">
                  <button onClick={play315Game}>
                    <img
                      src="/public/assets/play315GameButton.svg"
                      alt="play315GameButton"
                    />
                  </button>
                </div>
              </div>
            </InfoSection>
          </div>
        </div>
      </div>
    </>
  );
};

const play315Game = () => {
  console.log("315게임을 실행합니다!");
};

export default EventPeriod;