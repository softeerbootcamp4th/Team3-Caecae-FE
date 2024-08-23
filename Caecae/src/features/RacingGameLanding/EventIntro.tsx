import { useState } from "react";
import { Link } from "../../shared/Hyunouter";

interface EventIntroProps {
  isEventOpen: boolean;
}

const EventIntro: React.FC<EventIntroProps> = ({isEventOpen}) => {
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

  const checkEventOpen = () => {
    if(!isEventOpen) {
      alert("지금은 이벤트 기간이 아닙니다!");
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center relative">
        <div className="flex flex-col absolute z-20 items-center mt-20">
          <p className="text-[#B6B6B6] text-[20px]">
            <span className="text-white font-bold">CASPER Electric </span>
            신차 출시 추첨 이벤트
          </p>
          <h1 className="flex items-center font-galmuri text-[white] text-[80px] font-bold mb-2">
            전력으로...!
            <div className="relative inline-block ml-5">
              <span className="absolute inset-0 pl-2 pt-1 flex items-center justify-center text-black">
                315Km
              </span>
              <img
                src="/assets/background315km.svg"
                alt="background315km"
                className="block"
              />
            </div>
          </h1>
          <p className="text-white text-[24px] text-center">
            315km를 전력으로 질주하고
            <br />
            <span className="text-[#00AAD2]">캐스퍼 일렉트릭 </span>
            받아가자!
          </p>
          <img
            src="/assets/pixelCasper.svg"
            alt="pixelCasper"
            className="pr-10"
          />
          <div className="flex flex-row gap-6 justify-center items-center">
            <div
              className="bg-[#0609CD] w-[300px] h-[80px] flex flex-row justify-center items-center gap-3 hover:cursor-pointer"
              onClick={shareEvent}
            >
              <img src="/assets/sharedButton.svg" alt="sharedButton" />
              <span className="text-white text-[22px]">공유하기</span>
            </div>
            <div onClick={checkEventOpen}>
              <Link to={isEventOpen ? "/racecaspergame" : "/racecasper"}>
                <div className="bg-white w-[300px] h-[80px] flex flex-row justify-center items-center gap-3 hover:cursor-pointer">
                  <span className="text-[22px]">전력 질주하러 가기</span>
                  <img src="/assets/rightShevron.svg" alt="rightShevron" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/assets/backgroundGradation.svg"
            alt="backgroundGradation"
            className="absolute top-0 left-0 w-full h-screen object-cover object-bottom-center"
          />
          <img
            src="/assets/leftEffect.svg"
            alt="leftEffect"
            className="opacity-[70%] w-[350px] left-0 top-56 absolute z-10"
          />
          <img
            src="/assets/rightEffect.svg"
            alt="rightEffect"
            className="opacity-[70%] w-[230px] right-0 top-96 absolute z-10"
          />
        </div>
        {showMessage && (
          <div className={`absolute left-1/2 bottom-[150px] z-50 transform -translate-x-1/2 text-white bg-[#1C1A1B] border-blue-700 border-4 px-6 py-3 rounded-2xl transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-center items-center text-[24px]">
              URL이 복사되었습니다!
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventIntro;
