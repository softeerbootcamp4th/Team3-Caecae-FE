import { ChangeEventHandler, useEffect, useState } from "react";
import { action } from "../../jobs/Overlay/OverlayWork";
import { store } from "../../shared/Hyundux";

interface PhoneNumberOverlayProps {
  type: "findCasper" | "raceCasper";
  onClick?: (phoneNumber: string) => void;
}

const PhoneNumberOverlay = ({
  type,
  onClick = () => {},
}: PhoneNumberOverlayProps) => {
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3분을 초 단위로 변환
  const [phoneNumber, setPhoneNumber] = useState("");
  const [check, setCheck] = useState(false);
  const [enterable, setEnterable] = useState(false);

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

  const onPhoneNumberFieldChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    let number = "";
    const cleaned = event.target.value.replace(/\D/g, "");

    // 유효성 검사
    if (cleaned.length <= 3) {
      number = cleaned;
      setPhoneNumber(number);
    } else if (cleaned.length <= 7) {
      number = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      setPhoneNumber(number);
    } else if (cleaned.length <= 11) {
      number = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(
        7,
        11
      )}`;
      if (cleaned.length == 11) {
        console.log(1234123);
      }
      setPhoneNumber(number);
    }
  };

  const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = () => {
    setCheck((prev) => !prev);
  };

  useEffect(() => {
    const number = phoneNumber.split("-").join("");
    if (
      check &&
      number.length == 11 &&
      number.slice(0, 3) === "010" &&
      enterable === false
    ) {
      setEnterable(true);
    } else if (enterable === true) {
      setEnterable(false);
    }
  }, [check, phoneNumber]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-[60px] pt-[80px] grow">
        <p className="text-[32px] font-bold text-[#1C1A1B]">전화번호 입력</p>
        {type === "findCasper" ? (
          <div className="mt-[10px] text-[18px]">
            <span className="text-[#F21415] underline mt-[10px]">
              <span>{timeToString()}</span> 내
            </span>
            <span className="text-[#444444]">
              에 입력하지 않으면 미당첨으로 간주되어 자동 종료됩니다.
            </span>
          </div>
        ) : (
          <div className="text-[#444444] mt-[10px]">
            <span>경품 수령을 위해 간단한 정보를 입력해 주세요.</span>
          </div>
        )}
        <div className="flex items-center mt-[70px] justify-between">
          <p className="font-bold text-[22px] text-[#1C1A1B] mr-[80px]">
            전화번호
          </p>
          <input
            type="text"
            value={phoneNumber}
            onChange={onPhoneNumberFieldChange}
            placeholder={""}
            className="border border-gray-300 bg-white py-2 px-4 text-base focus:focus:border-[#002C5F] w-[600px] h-[55px]"
          />
        </div>
        <div className="flex mt-[45px] justify-between">
          <p className="font-bold text-[22px] text-[#1C1A1B] mr-[80px] pt-[12px]">
            개인정보 동의
          </p>
          <div>
            <div className="border border-gray-300 bg-white py-2 px-4 w-[600px] h-[140px] overflow-auto">
              <p>
                1. 개인정보의 처리 목적
                <br />
                개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는
                다음의 목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경될
                시에는 사전 동의를 구할 예정입니다.
                <br />
                1. 개인정보의 처리 목적
                <br />
                개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는
                다음의 목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경될
                시에는 사전 동의를 구할 예정입니다.
                <br />
                1. 개인정보의 처리 목적
                <br />
                개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는
                다음의 목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경될
                시에는 사전 동의를 구할 예정입니다.
                <br />
              </p>
            </div>
            <div className="flex mt-[20px] items-center">
              <input
                type="checkbox"
                checked={check}
                onChange={onCheckboxChange}
                className="form-checkbox h-4 w-4 text-[#002C5F] border-[#DDD] bg-neutral-white mr-[5px]"
              />
              <p className="ml-2">
                개인정보보호법에 따라 귀하의 개인정보를 다음과 같이
                수집・이용하는데 동의합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      {enterable === true ? (
        <div
          onClick={() => {
            const parameter = phoneNumber.replace(/-/g, "");
            onClick(parameter);
            store.dispatch(action.nextPage());
          }}
          className="bg-[#002C5F] h-[12%] flex items-center justify-center hover:cursor-pointer"
        >
          <p className="text-white text-[20px] font-bold">응모 완료하기</p>
        </div>
      ) : (
        <div className="bg-[#CCCCCC] h-[12%] flex items-center justify-center">
          <p className="text-white text-[20px] font-bold">
            개인정보를 입력해주세요
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberOverlay;
