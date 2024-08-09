interface SmileBadgeProps {
  width: number;
  height?: number;
  isSelected?: boolean;
  badgeType: number;
}

const SmileBadge = ({
  isSelected = false,
  width,
  height,
  badgeType,
}: SmileBadgeProps) => {
  const badgeTypeList = [
    "blue", // 0
    "orange", // 1
    "yellow", // 2
    "yellow_wink", // 3
    "white", // 4
    "blue_line", // 5
    "orange_line", // 6
    "yellow_line", // 7
    "orange_sad", // 8
  ];
  const getImageSrc =
    "/public/assets/" + badgeTypeList[badgeType] + "Badge.svg";

  const checkIcon = isSelected ? (
    <img
      src="/public/assets/checkCircleIcon.svg"
      alt="hyundaiLogo"
      width={70}
      className="absolute z-20"
    />
  ) : null;
  return (
    <div className="relative flex items-center justify-center">
      {checkIcon}
      <img
        src={getImageSrc}
        alt="hyundaiLogo"
        width={width}
        height={height}
        className={isSelected ? "opacity-30" : ""}
      />
    </div>
  );
};

export default SmileBadge;
