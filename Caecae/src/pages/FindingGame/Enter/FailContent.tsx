import SmileBadge from "../../../components/common/SmileBadge";

const FailContent = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-20 pb-20">
        <p className="text-4xl font-black mb-3">아쉬워요...</p>
        <span className="text-center">
          선착순 인원이 모두 마감되었습니다.
          <br />
          내일 다시 기회를 노려보세요.
        </span>
        <div className="mt-[80px]">
          <SmileBadge width={180} badgeType="orange_sad" />
        </div>
        <div className="flex w-[521px] justify-center items-center px-20 py-5 bg-[#002C5F] mt-[60px]">
          <span className="text-white text-[18px]">확인</span>
        </div>
      </div>
    </>
  );
};

export default FailContent;
