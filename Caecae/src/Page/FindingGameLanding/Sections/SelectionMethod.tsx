import InfoSection from "../../../Widget/InfoSection/InfoSection";
import Circle from "../../../Widget/Shape/Circle";
import SmileBadge from "../../../Widget/SmileBadge/SmileBadge";

const SelectionMethod = () => {
  return (
    <div className="h-[115vh] bg-[black]">
      <div className="absolute z-10 flex flex-col items-center w-full h-screen">
        <p className="text-[white] font-[900] text-[35px] mt-[60px]">
          참여 혜택 및 선정 방식
        </p>
        <div className="mt-[50px]">
          <InfoSection title="선착순 315명 전원 증정">
            <div className="flex flex-col justify-center items-center py-[60px] px-[60px]">
              <div className="absolute left-[-70px] top-[200px] transform rotate-[12deg] ">
                <SmileBadge width={150} badgeType={4} />
              </div>
              <p className="text-[white] text-center text-[18px] line-[140%]">
                매일 정해진 선착순 인원에게{" "}
                <span className="text-[#00AAD2]">스타벅스 1만 원 쿠폰</span>을
                드려요.
                <br />
                당첨 후 <span className="text-[#00AAD2]">3분 내</span>로 전화
                번호를 기입하면 응모 완료!
              </p>
              <p className="text-[white] text-[14px] mt-[20px]">
                * 하루에 한 번 응모 가능합니다.
              </p>
              <div className="flex justify-center gap-[30px] mt-[40px]">
                <div className="border-l border-r border-b border-white w-[350px] relative">
                  <div className="absolute right-[-50px] top-[-50px]">
                    <div className="relative">
                      <p className="text-[white] text-[18px] font-bold absolute left-[50px] top-[50px] transform -translate-x-1/2 -translate-y-1/2 ">
                        315명
                      </p>
                    </div>
                    <Circle color="0000FF" radius={100} />
                  </div>
                  <div className="bg-white flex justify-center items-center h-[60px]">
                    <p className="font-galmuri font-[700] text-[24px]">
                      스타벅스 1만원 쿠폰
                    </p>
                  </div>
                  <img
                    src="/src/Shared/assets/starbucks.svg"
                    alt="starbucks"
                    className="w-full p-[8px]"
                  />
                </div>
              </div>
            </div>
          </InfoSection>
        </div>
      </div>
    </div>
  );
};

export default SelectionMethod;
