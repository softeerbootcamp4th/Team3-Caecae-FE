const EventInfoTitle = () => {
  return (
    <>
      <div className="flex w-full h-screen justify-center relative">
        <div className="flex flex-col absolute z-20 items-center top-48">
          <p className="text-[28px] text-[#F7F7F7]">
            CASPER Electric
            <span className="text-[28px] text-[#CCCCCC] pl-2">
              신차 출시 이벤트
            </span>
          </p>
          <p className="text-[36px] text-white mt-2">
            캐스퍼 일렉트릭
            <span className="text-[36px] text-[#CCCCCC]">
              과 함께하는 7일간의 캐미
            </span>
          </p>
          <p className="text-[36px] text-white">
            08.26&nbsp;&nbsp;⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯&nbsp;&nbsp;09.01
          </p>
          <h1 className="text-[96px] text-white mt-10 font-bold">
            "너의 능력을 보여줘"
          </h1>
        </div>
        <div>
          <img
            src="/assets/eventInfoPage1.svg"
            alt="eventInfoPage1"
            className="absolute top-0 left-0 w-full h-screen object-cover object-bottom-center"
          />
        </div>
      </div>
    </>
  );
};

export default EventInfoTitle;
