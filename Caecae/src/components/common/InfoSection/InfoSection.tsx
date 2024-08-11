import { ReactElement, ReactNode } from "react";
interface InfoSectionProps {
  type?: "Default" | "Header";
  title?: string;
  children: ReactNode;
}

const InfoSection = ({
  type = "Header",
  title = "",
  children,
}: InfoSectionProps) => {
  let header: ReactElement | null = null;

  switch (type) {
    case "Header":
      header = (
        <div className="flex justify-center items-center">
          <img
            src="/src/assets/sectionContentHeader.svg"
            alt="howToEventLeft"
          />
          <p className="absolute text-[white] font-galmuri text-[28px]">
            {title}
          </p>
        </div>
      );
      break;
    case "Default":
      header = <img src="/src/assets/topLine.svg" alt="topLine" />;
      break;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {header}
        <div className="border-l-4 border-r-4 border-white relative w-full h-full">
          {children}
          <InfoSectionDot key={0} top={20} left={20} />
          <InfoSectionDot key={1} top={20} right={20} />
          <InfoSectionDot key={2} bottom={20} left={20} />
          <InfoSectionDot key={3} bottom={20} right={20} />
        </div>
        <img src="/src/assets/bottomLine.svg" alt="howToEventRight" />
      </div>
    </>
  );
};

interface InfoSectionDotProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

const InfoSectionDot = ({
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
}: InfoSectionDotProps) => {
  const style: React.CSSProperties = {
    top: `${top}px`,
    bottom: `${bottom}px`,
    left: `${left}px`,
    right: `${right}px`,
    width: "20px",
    position: "absolute",
    zIndex: "10",
  };

  return (
    <img
      src="/src/assets/infoSectionPoint.svg"
      alt="infoSectionPoint"
      style={style}
    />
  );
};

export default InfoSection;
