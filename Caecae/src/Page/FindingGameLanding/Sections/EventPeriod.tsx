import InfoSection from "../../../Widget/InfoSection/InfoSection";
import Circle from "../../../Widget/Shape/Circle";
import SmileBadge from "../../../Widget/SmileBadge/SmileBadge";

const EventPeriod = () => {
  return (
    <div className="h-screen bg-[black]">
      <div className="absolute z-10 flex flex-col items-center w-full h-screen">
        <p className="text-[white] font-[900] text-[35px] mt-[60px]">
          이벤트 기간
        </p>
        <div className="mt-[50px]">
          <InfoSection title="7일간 매일매일">
            <div className="flex flex-col justify-center items-center py-[60px] px-[60px]">
              <div className="absolute right-[-70px] bottom-[200px] transform rotate-[-12deg] ">
                <SmileBadge width={150} badgeType={0} />
              </div>
              <p className="text-[white] text-center text-[18px] line-[140%]">
                참여 기간: 7.15 (월) - 7.21 (일){" "}
                <span className="text-[#00AAD2]">오후 3시 15분</span>
                <br />
                지급 날짜: 7.29 (월)부터 주말・공휴일 제외 순차적으로 발송
              </p>
              <div className="flex flex-col justify-center items-center gap-[80px] mt-[60px]">
                <div className="flex">
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      7.15
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/src/Shared/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      7.16
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/src/Shared/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      7.17
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/src/Shared/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      7.18
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
                      7.19
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/src/Shared/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      7.20
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/src/Shared/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      7.21
                    </div>
                    <p className="text-[white] text-[18px] font-bold absolute left-[60px] top-[60px] transform -translate-x-1/2 -translate-y-1/2 ">
                      315명
                    </p>
                    <Circle color="000066" radius={120} />
                  </div>
                  <img src="/src/Shared/assets/arrow.svg" alt="arrow" />
                  <div className="relative">
                    <div className="text-[white] text-[18px] font-bold absolute left-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-[blue] px-[8px] py-[2px] rounded-2xl">
                      7.29
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