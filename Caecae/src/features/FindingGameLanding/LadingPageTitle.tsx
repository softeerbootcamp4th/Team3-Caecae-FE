import { useState } from "react";

interface LadingPageTitleProps {
  onClick: () => void;
}

const LadingPageTitle = ({ onClick }: LadingPageTitleProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const shareEvent = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const url: string = window.location.href;

    let textArea = document.createElement("textarea");
    textArea.value = url;

    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";

    document.body.appendChild(textArea);
    textArea.select();

    return new Promise((res, rej) => {
        if (document.execCommand('copy')) {
            res(url)
        }else {
            rej();
        }
        textArea.remove();
    }).then(() => {
      setShowMessage(true);

      setTimeout(() => {
        setAnimate(true);

        setTimeout(() => {
          setAnimate(false);

          setTimeout(() => {
            setShowMessage(false);
            setIsAnimating(false);
          }, 500);

        }, 3000);
        
      }, 10);  
    }).catch((err: Error) => {
      console.error('URL 복사에 실패했습니다.', err);
      setIsAnimating(false);
    });
  };
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center relative overflow-hidden min-h-[950px]">
        <div className="absolute z-20 flex flex-col items-center h-screen justify-center min-h-[950px]">
          <p className="text-[#CCCCCC] text-[20px]">
            <span className="font-bold text-[white]">CASPER Electric</span> 신차
            출시 선착순 이벤트
          </p>
          <div className="flex gap-4 items-center">
            <p className="font-galmuri text-[white] text-[80px] font-bold">
              나를 찾아봐!
            </p>
            <img
              src="/assets/magnifier.svg"
              alt="Magnifier"
              className="h-[70px]"
            />
          </div>
          <p className="text-center text-[white] text-[24px]">
            캐스퍼 일렉트릭에 숨겨진 로봇 뱃지
            <br /> 찾고{" "}
            <span className="text-[#00AAD2]">1만 원 커피 쿠폰 </span>
            받아가자!
          </p>
          <img
            src="/assets/smileBage3D.svg"
            alt="smileBage3D"
            className="h-1/3 mt-[50px] min-h-[200px]"
          />
          <div className="flex gap-[30px] h-[80px]">
            <div
              className="bg-[#0609CD] flex items-center justify-center w-[300px] h-full hover:cursor-pointer"
              onClick={shareEvent}
            >
              <img src="/assets/sharedButton.svg" alt="sharedButton" />
              <p className="text-[white] text-[22px] ml-[10px]">공유하기</p>
            </div>
            <div
              className="bg-[white] flex items-center justify-center gap-[15px] w-[300px] h-full"
              onClick={() => onClick()}
            >
              <p className="text-[22px]">바로 캐스퍼 찾으러가기</p>
              <img src="/assets/rightShevron.svg" alt="sharedButton" />
            </div>
          </div>
        </div>
        <div id="background">
          <img
            src="/assets/findGameTitleBackground.svg"
            alt="findGameLeftBlocks"
            className="absolute top-0 left-0 w-full h-screen object-cover bg-[black] object-bottom-center min-h-[950px]"
          />
          <img
            src="/assets/findGameLeftBlocks.svg"
            alt="findGameLeftBlocks"
            className="opacity-[100%] w-[400px] left-0 absolute bottom-0 z-10"
          />
          <img
            src="/assets/findGameRightBlocks.svg"
            alt="findGameLeftBlocks"
            className="opacity-[100%] w-[300px] right-0 absolute bottom-0 z-10"
          />
        </div>
        {showMessage && (
          <div
            className={`absolute left-1/2 bottom-[170px] z-50 transform -translate-x-1/2 text-white bg-[#1C1A1B] border-blue-700 border-4 px-6 py-3 rounded-2xl transition-opacity duration-1000 ${
              animate ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex justify-center items-center text-[24px]">
              URL이 복사되었습니다!
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LadingPageTitle;
