import { useState } from "react";
import { action } from "../../../jobs/Overlay/OverlayWork";
import { useSaga } from "../../../shared/Hyundux-saga";
import { getRacingGameOption } from "../../../stories/getRacingGameOption";

interface Option {
    id: number;
    imgSrc: string;
    title: string | JSX.Element;
    description: string;
}

interface SelectCustomProps {
    onClick: (
        phone: string,
        selectedOption: number | null
    ) => void;
}

const SelectCustom = ({
   onClick = () => {},
}:SelectCustomProps) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [enterable, setEnterable] = useState(false);
    const [status, teller] = useSaga();
    status;
    const options: Option[] = [
        { id: 0, imgSrc: "/assets/racingGameCase1Image.svg", title: "Case 1. 공간활용의 기술", description: "캐스퍼 일렉트릭의 구석구석을\n활용해 많은 물건도 알차게 실을래요." },
        { id: 1, imgSrc: "/assets/racingGameCase2Image.svg", title: "Case 2. 레저의 정석", description: "캐스퍼 일렉트릭과 함께 방방곡곡\n누빌 레저 라이프가 기대되어요." },
        { id: 2, imgSrc: "/assets/racingGameCase3Image.svg", title: <>Case 3. 여행의 정석 <span className="text-[10px]">Camping</span></>, description: "캐스퍼 일렉트릭과 함께 아웃도어\n활동을 쉽고 편안하게 할래요." },
        { id: 3, imgSrc: "/assets/racingGameCase4Image.svg", title: <>Case 4. 여행의 정석 <span className="text-[10px]">Picnic</span></>, description: "캐스퍼 일렉트릭과 함께하는 즐거운\n피크닉이 기대되어요." },
        { id: 4, imgSrc: "/assets/racingGameCase5Image.svg", title: "Case 5. 펫 프렌들리", description: "캐스퍼 일렉트릭으로 반려동물과\n편안하고 안전한 여행을 할래요." },
    ];

    const handleOptionSelect = (id: number) => {
        setSelectedOption(id);
        setEnterable(true);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="px-[60px] pt-[70px] grow">
                <div className="text-[32px] font-bold self-start">
                    기대되는 옵션 선택하고 추가 당첨 확률 높이기!
                </div>
                <div className="text-[18px] self-start mt-[10px]">
                    원하는 캐스퍼 일렉트릭 커스터마이징 옵션을 골라주세요.
                    <br/>
                    캐스퍼 일렉트릭 당첨 시 선택한 옵션으로 받게 돼요.
                </div>
                <div className="flex flex-row gap-3 mt-5">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="flex flex-col cursor-pointer"
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            <div className="mt-2">
                                <img src={option.imgSrc} alt={`option${option.id}`} />
                            </div>
                            <div className="relative mt-2">
                                <img 
                                    src={selectedOption === option.id 
                                        ? "/assets/customSelectDescriptionFocus.svg" 
                                        : "/assets/customSelectDescription.svg"} 
                                    alt={`option${option.id}`} 
                                />
                                <div className="absolute inset-0 top-2 flex flex-col justify-center items-center text-center p-1">
                                    <div className={selectedOption === option.id
                                        ? "text-white font-bold text-[13px]"
                                        : "text-[#1C1A1B] font-bold text-[13px]"}
                                    >
                                        {option.title}
                                    </div>
                                    <div className={selectedOption === option.id
                                        ? "text-[#D9D9D9] text-[11px] mt-1 whitespace-pre-line"
                                        : "text-[#666666] text-[11px] mt-1 whitespace-pre-line"}
                                    >
                                        {option.description}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="custom-option"
                                        value={option.id}
                                        checked={selectedOption === option.id}
                                        onChange={() => handleOptionSelect(option.id)}
                                        className="sr-only peer"
                                    />
                                    <div className={`w-8 h-8 rounded-full border-2 
                                        ${selectedOption === option.id ? "border-[#002C5F]" : "border-gray-300"} 
                                        flex items-center justify-center
                                        peer-checked:border-[#002C5F]`}
                                    >
                                        {selectedOption === option.id && (
                                            <div className="w-5 h-5 rounded-full bg-[#002C5F]"></div>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {enterable === true ? (
                    <div 
                        onClick={() => {
                            // onClick("01022222222", selectedOption)
                            teller(action.nextPage, getRacingGameOption, { phone: "01044444444", selection: selectedOption })
                            // store.dispatch(action.nextPage());
                        }}
                        className="bg-[#002C5F] h-[12%] flex items-center justify-center hover:cursor-pointer"
                    >
                        <p className="text-white text-[20px] font-bold">확인</p>
                    </div>
                ) : (
                    <div className="bg-[#CCCCCC] h-[12%] flex items-center justify-center">
                        <p className="text-white text-[20px] font-bold">마음에 드는 커스텀마이징을 선택하세요</p>
                    </div>
                )}
        </div>
    );
};

export default SelectCustom;