import Link from "../../../Shared/Hyunouter/Link";
import InfoSection from "../../../Widget/InfoSection/InfoSection";
import SmileBadge from "../../../Widget/SmileBadge/SmileBadge";

const GoToEvent = () => {
    return (
        <>
            <div className="flex w-full h-[1200px] justify-center items-start pt-5 relative bg-black" id="targetSection">
                <div className="flex flex-col absolute z-20 items-center">
                    <div>
                        <SmileBadge isSelected={false} width={203} height={134} badgeType={4} />    
                    </div>
                    <p className="text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#999999] mt-8">
                        "그럼, 우리 캐미를 확인해 볼까?"
                    </p>
                    <div className="flex flex-row mt-16 gap-10">
                        <InfoSection type={1} location="end">
                            <div className="flex flex-col justify-center items-center bg-[#191919]">
                                <div className="my-8">
                                    <img src="/src/Shared/assets/sharp1.svg" alt="sharp1" />
                                </div>
                                <h2 className="font-galmuri text-[#D9D9D9] text-[24px]">
                                    선착순 경품 이벤트
                                </h2>
                                <div className="flex flex-row items-center">
                                    <h1 className="font-galmuri text-white text-[48px] font-bold">나를 찾아봐!</h1>
                                    <img src="/src/Shared/assets/magnifier.svg" alt="magnifier" className="h-[45px] ml-2"/>
                                </div>
                                <p className="text-[#CCCCCC] text-[22px] text-center mt-4">
                                    매일 오후 3시 15분 선착순으로 캐스퍼 일렉트릭 속
                                    <br />
                                    숨겨진 캐스퍼를 찾고 제출하면 경품 당첨!
                                </p>
                                <div className="mt-10">
                                    <img src="/src/Shared/assets/findCasperLogo.svg" alt="findCasperLogo" className="h-[260px] mb-10"/>
                                </div>
                                <Link to="/findcasper">
                                    <button className="mb-16">
                                        <img src="/src/Shared/assets/eventEnterBtn.svg" alt="eventEnterBtn" />
                                    </button>
                                </Link>
                            </div>
                        </InfoSection>
                        <InfoSection type={1} location="start">
                        <div className="flex flex-col justify-center items-center bg-[#191919]">
                                <div className="my-8">
                                    <img src="/src/Shared/assets/sharp2.svg" alt="sharp2" />
                                </div>
                                <h2 className="font-galmuri text-[#D9D9D9] text-[24px]">
                                    당첨자 경품 이벤트
                                </h2>
                                <h1 className="flex items-center font-galmuri text-[white] text-[48px] font-bold">
                                    전력으로...!
                                    <div className="relative inline-block ml-2">
                                        <span className="absolute inset-0 flex items-center justify-center text-black">
                                            315Km
                                        </span>
                                        <img src="/src/Shared/assets/background315km.svg" alt="background315km" className="block h-[55px]" />
                                    </div>
                                </h1>
                                <p className="text-[#CCCCCC] text-[22px] text-center mt-4">
                                    캐스퍼 일렉트릭을 전속력으로 운전해 315km에
                                    <br />
                                    가장 가까이 멈추는 당신에게 캐스퍼 일렉트릭을 드립니다.
                                </p>
                                <div className="mt-10">
                                    <img src="/src/Shared/assets/pixelCasper.svg" alt="pixelCasper" className="pr-10 h-[300px]"/>
                                </div>
                                <Link to="/racecasper">
                                    <button className="mb-16">
                                        <img src="/src/Shared/assets/eventEnterBtn.svg" alt="eventEnterBtn" />
                                    </button>
                                </Link>
                               
                            </div>
                        </InfoSection>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GoToEvent;
