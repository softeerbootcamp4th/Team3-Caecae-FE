import InfoSection from "../../components/common/InfoSection/index";
import Circle from "../../components/common/Shape/index";
import SmileBadge from "../../components/common/SmileBadge/index";

const EventPeriod = () => {
  return (
    <div className="h-[100vh] bg-[black] min-h-[950px]">
      <div className="absolute z-10 flex flex-col items-center w-full h-screen">
        <p className="text-[white] font-[900] text-[40px] mt-[60px]">
          이벤트 기간
        </p>
        <div className="mt-[50px] flex justify-center">
          <InfoSection title="7일간 매일매일" width={90}>
            <div className="flex flex-col justify-center items-center py-[60px] px-[60px]">
              <div className="absolute right-[-70px] bottom-[200px] transform rotate-[-12deg] ">
                <SmileBadge width={150} badgeType="blue" />
              </div>
              <p className="text-[white] text-center text-[22px] line-[140%]">
                참여 기간: 8.26 (월) - 9.1 (일){" "}
                <span className="text-[#00AAD2]">오후 3시 15분</span>
                <br />
                지급 날짜: 9.9 (월)부터 주말・공휴일 제외 순차적으로 발송
              </p>
              <div className="flex flex-col justify-center items-center gap-[80px] mt-[60px]">
                <div className="flex">
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      8.26
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      8.27
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      8.28
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      8,29
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                </div>
                <div className="flex">
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      8.30
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      8.31
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      9.1
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      9.9
                    </div>
                    <p className="text-[black] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                      쿠폰 지급
                    </p>
                    <Circle color="ffffff" radius={120} />
                  </div>
                </div>
              </div>
            </div>
          </InfoSection>
        </div>
      </div>
    </div>
  );
};

export default EventPeriod;
