import { useEffect, useState } from "react";
import SmileBadge from "../../../Widget/SmileBadge/SmileBadge.tsx";
import store from "../../../Shared/Hyundux/Store.tsx";
import { action } from "../../../jobs/Overlay/OverlayWork.tsx";

const EnterContent = () => {
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3분을 초 단위로 변환

  const timeToString = () => {
    const minute = Math.floor(timeLeft / 60);
    const second = timeLeft % 60;
    const minuteStr = "0" + `${minute}`;
    const secondStr = second < 10 ? "0" + `${second}` : `${second}`;
    return minuteStr + ":" + secondStr;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Todo: 여기 있는 store 제거하기
          store.dispatch(action.toggleOverlay());
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-20 pb-20">
        <p className="text-4xl font-black mb-3">축하합니다!</p>
        <span className="text-center">
          캐스퍼 찾기 이벤트에 당첨되셨습니다.
          <br />
          전화번호를 입력하고 쿠폰을 받아가세요.
        </span>
        <div className="mt-[80px]">
          <SmileBadge width={180} badgeType={1} />
        </div>
        <div
          className="flex w-[521px] justify-center items-center px-20 py-5 bg-[#002C5F] mt-[60px]"
          onClick={() => {
            store.dispatch(action.nextPage());
          }}
        >
          <span className="text-white text-[18px]">전화번호 입력하러 가기</span>
        </div>
        <div className="flex pt-[20px]">
          <span className="text-[red] underline">
            <span>{timeToString()}</span>내
          </span>
          <span>에 입력하지 않으면 미당첨으로 간주되어 자동 종료됩니다.</span>
        </div>
      </div>
    </>
  );
};

export default EnterContent;
