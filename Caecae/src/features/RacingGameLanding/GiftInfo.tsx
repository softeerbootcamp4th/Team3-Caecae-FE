import InfoSection from "../../components/common/InfoSection/index";

const GiftInfo = () => {
  return (
    <>
      <div className="relative h-[1400px] bg-black">
        <div className="absolute inset-0 z-10 flex flex-col items-center w-full bg-[#00113F] bg-opacity-40">
          <h1 className="text-white font-[900] text-[40px] mt-16">참여 혜택</h1>
          <div className="mt-14  px-20">
            <InfoSection title="추첨 경품">
              <div className="flex flex-col justify-center items-center py-[60px] px-[60px]">
                <p className="text-white text-center text-[24px] line-[140%]">
                  캐스퍼 일렉트릭과 함께 압도적 캐미를 보여준 분께
                  <br />
                  <span className="text-[#00AAD2]">딱 맞는 아이템</span>을
                  경품으로 드립니다.
                </p>
                <div className="flex flex-row justify-center items-center gap-10 mt-14">
                  <div className="">
                    <img src="/assets/gift1st.svg" alt="gift1st" />
                  </div>
                  <div className="w-[399px] h-[238px] flex items-center justify-center border-white border-2">
                    <div className="w-[383px] h-[222px] bg-white text-[22px] flex flex-col justify-center items-center">
                      <span className="text-[28px] font-galmuri pb-2">
                        캐스퍼 일렉트릭 (1명)
                      </span>
                      캐스퍼 일렉트릭과 최고의 캐미를
                      <br />
                      보여준 당신! 캐스퍼 일렉트릭의
                      <br />
                      파트너로 선정되었습니다.
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-10 mt-14">
                  <div className="flex flex-col">
                    <div className="relative inline-block">
                      <span className="absolute inset-1 pl-1 text-black font-galmuri font-bold text-[24px]">
                        2등
                      </span>
                      <img src="/assets/trapezoid3.svg" alt="trapezoid3" />
                    </div>
                    <div>
                      <div className="flex flex-col p-2 border-white border-2">
                        <img src="/assets/gift2nd.svg" alt="gift2nd" />
                        <p className="text-[#CCCCCC] px-3 my-4">
                          <span className="font-galmuri text-white text-[20px] block mb-1">
                            스마트워치 (7명)
                          </span>
                          최대 7개의 디바이스를 지원하는 캐스퍼 일렉트릭
                          <br />
                          스마트키! 스마트 워치로 손쉽게 함께하세요.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative inline-block">
                      <span className="absolute inset-1 pl-1 text-black font-galmuri font-bold text-[24px]">
                        3등
                      </span>
                      <img src="/assets/trapezoid3.svg" alt="trapezoid3" />
                    </div>
                    <div>
                      <div className="flex flex-col p-2 border-white border-2">
                        <img src="/assets/gift3rd.svg" alt="gift3rd" />
                        <p className="text-[#CCCCCC] px-3 my-4">
                          <span className="font-galmuri text-white text-[20px] block mb-1">
                            무선 충전패드 (30명)
                          </span>
                          30분 만에 급속 충전되는 캐스퍼 일렉트릭.
                          <br />
                          V2L 기능도 제공하니까! 다른 디바이스도 간편하게.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative inline-block">
                      <span className="absolute inset-1 pl-1 text-black font-galmuri font-bold text-[24px]">
                        4등
                      </span>
                      <img src="/assets/trapezoid3.svg" alt="trapezoid3" />
                    </div>
                    <div>
                      <div className="flex flex-col p-2 border-white border-2">
                        <img src="/assets/gift4th.svg" alt="gift4th" />
                        <p className="text-[#CCCCCC] px-3 my-4">
                          <span className="font-galmuri text-white text-[20px] block mb-1">
                            휴대용 무드등 (64명)
                          </span>
                          64가지의 색상을 내뿜는 캐스퍼 일렉트릭 엠비언트
                          <br />
                          라이트! 휴대용 무드등과 언제나 무드있게.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </InfoSection>
          </div>
        </div>
        <div>
          <img
            src="/assets/leftEffect3.svg"
            alt="leftEffect3"
            className="opacity-[70%] w-[400px] left-10 top-[-170px] absolute"
          />
        </div>
      </div>
    </>
  );
};

export default GiftInfo;
