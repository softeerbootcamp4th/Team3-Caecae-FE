interface SmileBadgeProps {
  width: number;
  height?: number;
  isSelected?: boolean;
  badgeType:
    | "blue"
    | "orange"
    | "yellow"
    | "yellow_wink"
    | "white"
    | "blue_line"
    | "orange_line"
    | "yellow_line"
    | "orange_sad";
}

const SmileBadge = ({
  isSelected = false,
  width,
  height,
  badgeType,
}: SmileBadgeProps) => {
  const getImageSrc = "/public/assets/" + badgeType + "Badge.svg";

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
