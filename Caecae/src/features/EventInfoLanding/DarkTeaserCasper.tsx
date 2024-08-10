const DarkTeaserCasper = () => {
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center relative">
        <div className="flex flex-col absolute z-20 justify-center items-center">
          <h1 className="text-white text-[52px] font-bold">"사기캐 등장."</h1>
          <p className="text-center text-white text-[24px] text-transparent bg-clip-text bg-gradient-to-r from-[#D9D9D9] to-[#737373] mt-5">
            다양한 매력을 가진 캐스퍼 일렉트릭과 함께
            <br />
            캐미를 발휘해 캐스퍼 일렉트릭의 파트너가 되어보세요.
          </p>
        </div>
        <div>
          <img
            src="/public/assets/eventInfoPage3.svg"
            alt="eventInfoPage3"
            className="absolute top-0 left-0 w-full h-screen object-cover object-bottom-center"
          />
        </div>
      </div>
    </>
  );
};

export default DarkTeaserCasper;
