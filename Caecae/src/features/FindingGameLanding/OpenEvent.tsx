import { forwardRef, ReactElement, useEffect, useRef, useState } from "react";
import SmileBadge from "../../components/common/SmileBadge/index";
import { useSpecificTimeEffect } from "../../hooks";
import { Link } from "../../shared/Hyunouter";
import getFindingGameStartTime from "../../stories/getFindingGameStartTime";

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
      reponse.data.findingGameInfos.forEach((info, index) => {
        const tempAnswer: EventOpenStatus = chechCurrentStuts(
          info.startTime,
          info.endTime
        );

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

  console.log(eventStatus);
  let data: StatusInfo | null = null;
  if (eventStatus == "none") {
    data = {
      badgeTitle: "이벤트 오픈 예정",
      title: "7월 15일 오후 3시 15분",
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
              className="w-[15px] mx-[20px]"
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
        </>
      ),
      isButtonOpen: true,
    };
  }

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center w-full bg-[black] relative h-screen"
    >
      <div className="z-10 flex flex-col justify-center items-center ">
        <div className="text-[white] text-[18px] font-bold rounded-[80px] border-2 border-solid border-[rgba(0,0,255,0.60)] bg-[rgba(0,0,255,0.5)] px-[12px] py-[6px] inline">
          {data?.badgeTitle}
        </div>
        <div className="text-[white] text-[32px] font-bold mt-[20px]">
          {data?.title}
        </div>
        {data?.mainContent}
        <Link
          to={leftTime <= 0 ? "/findcaspergame#010643431936" : "/findcasper"}
          isPathChage={false}
        >
          <div
            className={`bg-[${
              data?.isButtonOpen ? "blue" : "#CCCCCC"
            }] w-[175px] h-[50px] flex items-center justify-center gap-3 mt-[60px]`}
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
      </div>
      <img
        src="/assets/openBackGround.svg"
        alt="smileBage3D"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px]"
      />
    </div>
  );
});

function chechCurrentStuts(startTime: number[], endTime: number[]) {
  const currentDate = new Date();
  const currentTime = [
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
  ];
  const soonTime = [...startTime];
  soonTime[3] = soonTime[3] - 1;

  function isIn(startTime: number[], targetTime: number[], endTime: number[]) {
    for (let i = 0; i < startTime.length; i++) {
      if (startTime[i] === endTime[i] && startTime[i] === targetTime[i])
        continue;
      else if (startTime[i] <= targetTime[i] && targetTime[i] <= endTime[i])
        return true;
      else return false;
    }
    return false;
  }
  if (isIn(soonTime, currentTime, startTime)) return "soon";
  else if (isIn(startTime, currentTime, endTime)) return "opened";
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
