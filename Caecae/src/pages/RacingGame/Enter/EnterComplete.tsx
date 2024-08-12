import { action } from "../../../jobs/Overlay/OverlayWork";
import { store } from "../../../shared/Hyundux";

const EnterComplete = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center p-[70px]">
                <div className="text-[36px] font-bold">
                    응모 완료!
                </div>
                <div className="text-[18px]">
                    중복 응모시 등록된 점수 중 최고점수 1건만 추첨에 반영됩니다.
                </div>
                <div className="flex justify-center items-center">
                    <img src="/public/assets/racingGameEnterImage.svg" alt="racingGameEnterImage" className="pr-[80px]" />
                </div>
                <div 
                    className="flex justify-center items-center w-[521px] h-[82px] bg-[#002C5F] mt-[30px]"
                    onClick={() => {
                        store.dispatch(action.toggleOverlay());
                    }}
                    >
                    <span className="text-white text-[18px]">확인</span>
                </div>
            </div>
            
        </>
    );
};

export default EnterComplete;
