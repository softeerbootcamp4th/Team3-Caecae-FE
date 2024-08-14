import InfoSection from "../../components/common/InfoSection/index";

const HowToEvent = () => {
  return (
    <div className="h-[115vh] bg-[black]">
      <div className="absolute z-10 flex flex-col items-center w-full h-screen">
        <p className="text-[white] font-[900] text-[35px] mt-[60px]">
          이벤트 참여 방법
        </p>
        <div className="mt-[50px] flex justify-center">
          <InfoSection title="나를 찾아봐" width={90}>
            <div className="flex flex-col justify-center items-center py-[60px] px-[60px]">
              <p className="text-[white] text-center text-[18px] line-[140%]">
                매일 새롭게 제공되는 캐스퍼 일렉트릭의 사진에서 숨겨진 로봇
                <br />
                뱃지와 픽셀 디자인을 찾아보세요.
                <br /> <p className="text-[#00AAD2]">모두 찾으면 미션 성공!</p>
              </p>
              <div className="flex justify-center gap-[30px] mt-[40px]">
                <div className="border-l border-r border-b border-white w-[350px]">
                  <div className="bg-white flex justify-center items-center h-[60px]">
                    <p className="font-galmuri font-[700] text-[24px]">
                      로봇 뱃지
                    </p>
                  </div>
                  <img
                    src="/assets/ladingRobotBadgeImage.svg"
                    alt="howToEventRight"
                    className="w-full p-[8px]"
                  />
                </div>
                <div className="border-l border-r border-b border-white w-[350px]">
                  <div className="bg-white flex justify-center items-center h-[60px]">
                    <p className="font-galmuri font-[700] text-[24px]">
                      픽셀 디자인
                    </p>
                  </div>
                  <img
                    src="/assets/laindingPixel.svg"
                    alt="howToEventRight"
                    className="w-full p-[8px]"
                  />
                </div>
              </div>
            </div>
          </InfoSection>
        </div>
      </div>

      <div className="relative">
        <img
          src="/assets/howToEventLeft.svg"
          alt="howToEventLeft"
          className="absolute top-0 left-0 w-[175px]"
        />
        <img
          src="/assets/howToEventRight.svg"
          alt="howToEventLeft"
          className="absolute top-0 right-0 w-[116px]"
        />
      </div>
    </div>
  );
};

export default HowToEvent;
