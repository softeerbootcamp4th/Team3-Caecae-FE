import { action } from "../../../jobs/Overlay/OverlayWork";
import store from "../../../Shared/Hyundux/Store";
import SmileBadge from "../../../Widget/SmileBadge/SmileBadge";

const SuccessEnterContent = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-20 pb-20">
        <p className="text-4xl font-black mb-3">응모 완료!</p>
        <span className="text-center">
          쿠폰은 7월 29일에 순차적으로 지급될 예정입니다.
          <br />
          참여해주셔서 감사합니다.
        </span>
        <div className="mt-[80px]">
          <SmileBadge width={180} badgeType={1} />
        </div>
        <div
          className="flex w-[521px] justify-center items-center px-20 py-5 bg-[#002C5F] mt-[60px]"
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

export default SuccessEnterContent;
