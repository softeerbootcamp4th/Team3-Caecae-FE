import { forwardRef, ReactElement, useEffect, useState } from "react";
import SmileBadge from "../../components/common/SmileBadge/index";
import { Link } from "../../shared/Hyunouter";
import getFindingGameStartTime from "../../stories/FindingGame/getFindingGameStartTime";

// props 타입 정의
interface OpenEventProps {}
type EventOpenStatus = "none" | "soon" | "opened";
interface StatusInfo {
  badgeTitle: string;
  title: string;
  mainContent: ReactElement;
  isButtonOpen: boolean;
}

const OpenEvent = forwardRef<HTMLDivElement, OpenEventProps>((props, ref) => {
  props;
  const [eventStatus, setEventStatus] = useState<EventOpenStatus>("none");
  const [leftTime, setLeftTime] = useState(0);
  const targetDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const reponse = await getFindingGameStartTime();

      let answer: EventOpenStatus = "none"; // 명시적으로 타입 지정
      reponse.data.findingGameInfos.forEach((info) => {
        const tempAnswer: EventOpenStatus = chechCurrentStuts(
          info.startTime,
          info.endTime
        );
        console.log(tempAnswer);

        if (tempAnswer !== "none") {
          answer = tempAnswer;
        }
        if (tempAnswer === "soon") {
          targetDate.setHours(info.startTime[3], info.startTime[4], 0, 0);
        }
      });
      setEventStatus(answer);

      // @ts-expect-error: 진짜 ts 병신
      if (answer === "soon") {
        const checkTime = () => {
          const now = new Date();
          setLeftTime(
            Math.floor((targetDate.getTime() - now.getTime()) / 1000)
          );
        };
        checkTime();
        const intervalId = setInterval(checkTime, 1000);
        return () => clearInterval(intervalId);
      }
    };

    fetchData();
  }, []);

  let data: StatusInfo | null = null;
  if (eventStatus == "none") {
    data = {
      badgeTitle: "이벤트 오픈 예정",
      title: "9월 1일 오후 3시 15분",
      mainContent: (
        <>
          <img
            src="/assets/comingSoon.svg"
            alt="smileBage3D"
            className="w-3/5  mt-[60px]"
          />
          <div className="mt-[60px]">
            <SmileBadge width={175} badgeType="yellow_wink" />
          </div>
          <div
            className={`bg-[#CCCCCC] w-[175px] h-[50px] flex items-center justify-center gap-3 mt-[60px]`}
            onClick={() => alert("현재시간엔 게임을 시작할 수 없습니다.")}
          >
            <span className="text-[white] font-semibold">
              캐스퍼 찾으러가기
            </span>
            <img
              src="/assets/whiteRightShevron.svg"
              alt="smileBage3D"
              className="w-[10px]"
            />
          </div>
        </>
      ),
      isButtonOpen: false,
    };
  } else if (eventStatus == "soon") {
    data = {
      badgeTitle: "이벤트 오픈 예정",
      title: "이벤트 오픈이 얼마 남지 않았어요!",
      mainContent: (
        <>
          <div className="flex gap-[10px] mt-[60px]">
            <div className="flex flex-col items-center">
              <div className="flex gap-[10px]">
                <WhiteTimerRectangle
                  num={Math.floor(leftTime / 60 / 10)}
                  key={0}
                />
                <WhiteTimerRectangle
                  num={Math.floor((leftTime / 60) % 10)}
                  key={1}
                />
              </div>
              <p className="text-[white] text-[24px] mt-[16px] font-thin">
                MINUTES
              </p>
            </div>
            <img
              src="/assets/colon.svg"
              alt="smileBage3D"
              className="w-[15px] mx-[20px] pb-12"
            />
            <div className="flex flex-col items-center">
              <div className="flex gap-[10px]">
                <WhiteTimerRectangle
                  num={Math.floor((leftTime % 60) / 10)}
                  key={2}
                />
                <WhiteTimerRectangle
                  num={Math.floor((leftTime % 60) % 10)}
                  key={3}
                />
              </div>
              <p className="text-[white] text-[24px] mt-[16px] font-thin">
                SECONDS
              </p>
            </div>
          </div>
        </>
      ),
      isButtonOpen: false,
    };
  } else {
    data = {
      badgeTitle: "이벤트 오픈",
      title: "캐스퍼가 당신이 찾아주길 기다리고 있어요!",
      mainContent: (
        <>
          <img
            src="/assets/hurryUp.svg"
            alt="smileBage3D"
            className="w-3/5  mt-[60px]"
          />
          <div className="mt-[60px]">
            <SmileBadge width={175} badgeType="yellow_wink" />
          </div>
          <Link
            to={leftTime <= 0 ? "/findcaspergame#010643431936" : "/findcasper"}
            isPathChage={false}
          >
            <div
              className={`bg-[blue] w-[175px] h-[50px] flex items-center justify-center gap-3 mt-[60px]`}
            >
              <span className="text-[white] font-semibold">
                캐스퍼 찾으러가기
              </span>
              <img
                src="/assets/whiteRightShevron.svg"
                alt="smileBage3D"
                className="w-[10px]"
              />
            </div>
          </Link>
        </>
      ),
      isButtonOpen: true,
    };
  }

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center w-full bg-[black] relative h-screen min-h-[950px]"
    >
      <div className="z-10 flex flex-col justify-center items-center">
        <div className="text-[white] text-[18px] font-bold rounded-[80px] border-2 border-solid border-[rgba(0,0,255,0.60)] bg-[rgba(0,0,255,0.5)] px-[12px] py-[6px] inline">
          {data?.badgeTitle}
        </div>
        <div className="text-[white] text-[32px] font-bold mt-[20px]">
          {data?.title}
        </div>
        {data?.mainContent}
      </div>
      <img
        src="/assets/openBackGround.svg"
        alt="smileBage3D"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[80%]"
      />
    </div>
  );
});

function chechCurrentStuts(startTime: number[], endTime: number[]) {
  const eventStartTime = new Date(
    startTime[0],
    startTime[1] - 1,
    startTime[2],
    startTime[3],
    startTime[4]
  );
  const currentTime = new Date();
  const eventEndTime = new Date(
    endTime[0],
    endTime[1] - 1,
    endTime[2],
    endTime[3],
    endTime[4]
  );
  const eventSoonTime = new Date(eventStartTime);
  eventSoonTime.setHours(eventStartTime.getHours() - 1);

  if (
    eventSoonTime.getTime() <= currentTime.getTime() &&
    currentTime.getTime() <= eventStartTime.getTime()
  )
    return "soon";
  else if (
    eventStartTime.getTime() <= currentTime.getTime() &&
    currentTime.getTime() <= eventEndTime.getTime()
  )
    return "opened";
  return "none";
}

const WhiteTimerRectangle = (props: { num: number }) => {
  return (
    <>
      <div className="flex items-center justify-center bg-[white] rounded-[10px] w-[90px] h-[130px]">
        <p className="text-[80px] text-[900]">{props.num}</p>
      </div>
    </>
  );
};

export default OpenEvent;
