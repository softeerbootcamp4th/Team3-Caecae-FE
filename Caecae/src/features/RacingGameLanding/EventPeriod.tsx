import InfoSection from "../../components/common/InfoSection/index";
import { Link } from "../../shared/Hyunouter";

interface EventPeriodProps {
  isEventOpen: boolean;
}

const EventPeriod:React.FC<EventPeriodProps> = ({isEventOpen}) => {

  const checkEventOpen = () => {
    if(!isEventOpen) {
      alert("지금은 이벤트 기간이 아닙니다!");
    }
  };

  return (
    <>
      <div className="relative h-[1100px] bg-black ">
        <div className="absolute inset-0 z-10 flex flex-col items-center w-full bg-[#00113F] bg-opacity-40">
          <h1 className="text-white font-[900] text-[40px] mt-16">
            이벤트 기간
          </h1>
          <div className="mt-14 px-20">
            <InfoSection title="7일간 매일매일">
              <div className="flex flex-col justify-center items-center py-[60px] px-[60px]">
                <p className="text-white text-center text-[22px] line-[140%]">
                  참여 기간: 8.26 (월) - 9.1 (일)
                  <br />
                  당첨자 발표 날짜: 9.2 (화)부터 주말ㆍ공휴일 제외 순차적으로 발송
                </p>
                <div className="my-16">
                  <img
                    src="/assets/eventPeriodBackground.svg"
                    alt="eventPeriodBackground"
                  />
                </div>
                <div onClick={checkEventOpen}>
                  <Link to={isEventOpen ? "/racecaspergame" : "/racecasper"}>
                    <div className="mt-2">
                      <img
                        src="/assets/play315GameButton.svg"
                        alt="play315GameButton"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </InfoSection>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPeriod;
