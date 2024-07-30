import { useEffect, useRef, useState } from "react";
import SmileBadge from "../../../Widget/SmileBadge/SmileBadge";

interface EnterContentProps {
  title: string;
  content: string;
  badgeType: number;
  isWaringTextShowing: boolean;
  buttonText: string;
}
const EnterContent = ({
  title,
  content,
  badgeType,
  isWaringTextShowing,
  buttonText,
}: EnterContentProps) => {
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3분을 초 단위로 변환

  const stringToElementContent = content.split(".").map((str) => {
    return (
      <span key={Math.random()}>
        {str + "."}
        <br />
      </span>
    );
  });
  const timeToString = () => {
    const minute = Math.floor(timeLeft / 60);
    const second = timeLeft % 60;
    const minuteStr = "0" + `${minute}`;
    const secondStr = second < 10 ? "0" + `${second}` : `${second}`;
    return minuteStr + ":" + secondStr;
  };

  const waringElement = isWaringTextShowing ? (
    <>
      <div className="flex pt-[20px]">
        <span className="text-[red] underline">
          <span>{timeToString()}</span>내
        </span>
        <span>에 입력하지 않으면 미당첨으로 간주되어 자동 종료됩니다.</span>
      </div>
    </>
  ) : null;

  useEffect(() => {
    if (isWaringTextShowing) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // Clean up the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-20 pb-20">
        <p className="text-4xl font-black mb-3">{title}</p>
        {stringToElementContent}
        <div className="mt-[80px]">
          <SmileBadge width={180} badgeType={badgeType} />
        </div>
        <div className="flex w-[521px] justify-center items-center px-20 py-5 bg-[#002C5F] mt-[60px]">
          <span className="text-white text-[18px]">{buttonText}</span>
        </div>
        {waringElement}
      </div>
    </>
  );
};

export default EnterContent;
