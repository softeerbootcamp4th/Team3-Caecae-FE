import InfoSection from "../../../Widget/InfoSection/InfoSection";

const HowToEvent = () => {
    return (
        <>
            <div className="h-[2100px] bg-black">
                <div className="absolute z-10 flex flex-col items-center w-full h-screen">
                    <h1 className="text-white font-[900] text-[40px] mt-16">
                        이벤트 참여 방법
                    </h1>
                    <div className="mt-14">
                        <InfoSection title="#1 전력으로... Game Start!">
                            <div className="flex flex-col justify-center items-center py-[60px] px-[60px]">
                                <p className="text-white text-center text-[24px] line-[140%]">
                                    캐스퍼 일렉트릭과 전력으로 315Km를 질주해보아요!
                                    <br />
                                    <span className="text-[#00AAD2]">315Km에 가장 가깝게 멈춘 사람</span>
                                    에게 추첨하여 경품 증정!
                                </p>
                                <p className="text-white text-[18px] mt-5">
                                    * 중복 응모 시 가장 높은 점수 1건만 추첨에 반영됩니다.
                                </p>
                                <div className="flex flex-row justify-center items-center gap-10 mt-14">
                                    <div className="flex flex-col p-2 border-white border-2">
                                        <img src="/src/Shared/assets/racingGameStep1Image.svg" alt="racingGameStep1Image" />
                                        <p className="text-[#CCCCCC] text-center my-4">
                                            스페이스바를 눌러 캐스퍼 일렉트릭을
                                            <br/>
                                            315km에 가장 가깝게 맞춰주세요!
                                        </p>
                                    </div>
                                    <div className="flex flex-col p-2 border-white border-2">
                                        <img src="/src/Shared/assets/racingGameStep2Image.svg" alt="racingGameStep2Image" />
                                        <p className="text-[#CCCCCC] text-center my-4">
                                            ‘경품 응모하기’ 버튼을 누르면 응모 완료!
                                            <br/>
                                            몇 번이든 재도전과 재응모가 가능해요.
                                        </p>
                                    </div>
                                    <div className="flex flex-col p-2 border-white border-2">
                                        <img src="/src/Shared/assets/racingGameStep3Image.svg" alt="racingGameStep3Image" />
                                        <p className="text-[#CCCCCC] text-center my-4">
                                        기대되는 커스터마이징 옵션 선택 시
                                        <br/>
                                        추첨 가산점 추가!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </InfoSection>
                    </div>
                    <div className="mt-14">
                        <InfoSection title="#2 가장 기대되는 Case는?">
                            <div className="flex flex-col justify-center items-center py-[60px] px-[60px]">
                                <p className="text-white text-center text-[24px] line-[140%]">
                                    캐스퍼 일렉트릭은 다양한 옵션 선택이 가능해요.
                                    <br/>
                                    가장 기대되는 커스터마이징 옵션을 고르면
                                    <span className="text-[#00AAD2]"> 당첨 확률이 더욱 UP! UP!</span>
                                </p>
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-center items-center gap-10 mt-14">
                                        <div className="flex flex-col p-2 border-white border-2">
                                            <img src="/src/Shared/assets/racingGameCase1Image.svg" alt="racingGameCase1Image" />
                                        </div>
                                        <div className="flex flex-col p-2 border-white border-2">
                                            <img src="/src/Shared/assets/racingGameCase2Image.svg" alt="racingGameCase2Image" />
                                        </div>
                                        <div className="flex flex-col p-2 border-white border-2">
                                            <img src="/src/Shared/assets/racingGameCase3Image.svg" alt="racingGameCase3Image" />
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-10 mt-10">
                                        <div className="flex flex-col p-2 border-white border-2">
                                            <img src="/src/Shared/assets/racingGameCase4Image.svg" alt="racingGameCase4Image" />
                                        </div>
                                        <div className="flex flex-col p-2 border-white border-2">
                                            <img src="/src/Shared/assets/racingGameCase5Image.svg" alt="racingGameCase5Image" />
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </InfoSection>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowToEvent;