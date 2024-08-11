const ShowCasper = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center relative">
        <div className="flex flex-col absolute z-20 top-[200px] left-[200px]">
          <h1 className="text-white text-[80px] font-bold">CASPER Electric</h1>
          <p className="text-white text-[32px]">
            전력을 다해, CASPER Electric 출시
          </p>
          <div className="flex flex-row mt-10">
            <button className="bg-[#002C5F] w-[138px] h-[40px] text-white">
              <a href="https://casper.hyundai.com/">자세히 알아보기</a>
            </button>
            <button
              className="bg-[#002C5F] w-[138px] h-[40px] ml-4 text-white"
              onClick={() => scrollToSection("targetSection")}
            >
              이벤트 바로가기
            </button>
          </div>
        </div>
        <div>
          <img
            src="/assets/eventInfoPage2.svg"
            alt="eventInfoPage2"
            className="absolute top-0 left-0 w-full h-screen object-cover object-bottom-center"
          />
        </div>
      </div>
    </>
  );
};

export default ShowCasper;
