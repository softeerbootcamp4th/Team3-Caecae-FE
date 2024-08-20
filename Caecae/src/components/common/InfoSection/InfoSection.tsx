import { ReactElement, ReactNode } from "react";
interface InfoSectionProps {
  width?: number;
  type?: "Default" | "Header";
  title?: string;
  children: ReactNode;
}

const InfoSection = ({
  type = "Header",
  title = "",
  children,
  width = 100,
}: InfoSectionProps) => {
  let header: ReactElement | null = null;

  switch (type) {
    case "Header":
      header = (
        <div className="flex justify-center items-center">
          <img src="/assets/sectionContentHeader.svg" alt="howToEventLeft" />
          <p className="absolute text-[white] font-galmuri text-[28px]">
            {title}
          </p>
        </div>
      );
      break;
    case "Default":
      header = <img src="/assets/topLine.svg" alt="topLine" />;
      break;
  }
  const style = {
    width: `${width}%`,
  };
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-full"
        style={style}
      >
        {header}
        <div className="border-l-4 border-r-4 border-white relative w-full h-full">
          {children}
          <InfoSectionDot key={0} top={20} left={20} />
          <InfoSectionDot key={1} top={20} right={20} />
          <InfoSectionDot key={2} bottom={20} left={20} />
          <InfoSectionDot key={3} bottom={20} right={20} />
        </div>
        <img src="/assets/bottomLine.svg" alt="howToEventRight" />
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

const InfoSectionDot = ({ top, bottom, left, right }: InfoSectionDotProps) => {
  const style: React.CSSProperties = {
    width: "20px",
    position: "absolute",
    zIndex: 10,
    ...(top !== undefined && { top: `${top}px` }),
    ...(bottom !== undefined && { bottom: `${bottom}px` }),
    ...(left !== undefined && { left: `${left}px` }),
    ...(right !== undefined && { right: `${right}px` }),
  };

  return (
    <img
      src="/assets/infoSectionPoint.svg"
      alt="infoSectionPoint"
      style={style}
    />
  );
};

export default InfoSection;
