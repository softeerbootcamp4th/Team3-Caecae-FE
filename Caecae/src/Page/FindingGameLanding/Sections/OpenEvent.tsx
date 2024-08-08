import React, {
  forwardRef,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import SmileBadge from "../../../Widget/SmileBadge/SmileBadge";
import useSpecificTimeEffect from "../../../Shared/Hooks/useSpecificTimeEffect";
import Link from "../../../Shared/Hyunouter/Link";

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
  const eventOpenStatus = useRef<EventOpenStatus>("none");
  const [leftTime, setLeftTime] = useState(0);

  const targetDate = new Date();
  targetDate.setHours(17, 0, 0, 0);

  useSpecificTimeEffect(targetDate, (leftSeconds) => {
    if (leftSeconds <= 3600 && leftSeconds > 0) {
      eventOpenStatus.current = "soon";
      setLeftTime(leftSeconds);
    } else if (leftSeconds < 0) {
      eventOpenStatus.current = "opened";
      setLeftTime(leftSeconds);
    } else {
      eventOpenStatus.current = "none";
    }
  });

  let data: StatusInfo | null = null;
  if (eventOpenStatus.current == "none") {
    data = {
      badgeTitle: "이벤트 오픈 예정",
      title: "7월 15일 오후 3시 15분",
      mainContent: (
        <>
          <img
            src="/src/Shared/assets/comingSoon.svg"
            alt="smileBage3D"
            className="w-3/5  mt-[60px]"
          />
          <div className="mt-[60px]">
            <SmileBadge width={175} badgeType={3} />
          </div>
        </>
      ),
      isButtonOpen: false,
    };
  } else if (eventOpenStatus.current == "soon") {
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
              src="/src/Shared/assets/colon.svg"
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
            src="/src/Shared/assets/hurryUp.svg"
            alt="smileBage3D"
            className="w-3/5  mt-[60px]"
          />
          <div className="mt-[60px]">
            <SmileBadge width={175} badgeType={3} />
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
              src="/src/Shared/assets/whiteRightShevron.svg"
              alt="smileBage3D"
              className="w-[10px]"
            />
          </div>
        </Link>
      </div>
      <img
        src="/src/Shared/assets/openBackGround.svg"
        alt="smileBage3D"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px]"
      />
    </div>
  );
});

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
