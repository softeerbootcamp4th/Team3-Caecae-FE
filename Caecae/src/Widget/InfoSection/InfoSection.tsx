import { ReactNode } from "react";

interface InfoSectionProps {
  type: number; // 헤더 있는 버전: 0, 헤더 없는 버전: 1
  width?: number;
  title?: string;
  location?: string; // start, center, end
  children: ReactNode;
}

const InfoSection = ({ type, title, location, children }: InfoSectionProps) => {
  switch(type) {
    case 0:
      return (
        <div className="flex justify-center items-center flex-col">
          <div className="flex justify-center items-center">
            <img
              src="/src/Shared/assets/sectionContentHeader.svg"
              alt="howToEventLeft"
              className="w-3/4"
            />
            <p className="absolute text-[white] font-galmuri text-[28px]">
              {title}
            </p>
          </div>
          <div className=" border-l-4 border-r-4 border-white relative w-3/4">
            {children}
            <img
              src="/src/Shared/assets/infoSectionPoint.svg"
              alt="infoSectionPoint"
              className="w-[20px] absolute z-10 left-[20px] top-[20px]"
            />
            <img
              src="/src/Shared/assets/infoSectionPoint.svg"
              alt="infoSectionPoint"
              className="w-[20px] absolute z-10 right-[20px] top-[20px]"
            />
            <img
              src="/src/Shared/assets/infoSectionPoint.svg"
              alt="infoSectionPoint"
              className="w-[20px] absolute z-10 left-[20px] bottom-[20px]"
            />
            <img
              src="/src/Shared/assets/infoSectionPoint.svg"
              alt="infoSectionPoint"
              className="w-[20px] absolute z-10 right-[20px] bottom-[20px]"
            />
          </div>
          <img
            src="/src/Shared/assets/bottomLine.svg"
            alt="howToEventRight"
            className="w-3/4"
          />
        </div>
      );
    case 1:
      return (
        <div className={`flex flex-col justify-center items-${location}`}>
          <img 
            src="/src/Shared/assets/topLine.svg"
            alt="topLine"
            className="w-3/4"
          />
          <div className=" border-l-4 border-r-4 border-white relative w-3/4">
            {children}
            <img
              src="/src/Shared/assets/infoSectionPoint.svg"
              alt="infoSectionPoint"
              className="w-[20px] absolute z-10 left-[20px] top-[20px]"
            />
            <img
              src="/src/Shared/assets/infoSectionPoint.svg"
              alt="infoSectionPoint"
              className="w-[20px] absolute z-10 right-[20px] top-[20px]"
            />
            <img
              src="/src/Shared/assets/infoSectionPoint.svg"
              alt="infoSectionPoint"
              className="w-[20px] absolute z-10 left-[20px] bottom-[20px]"
            />
            <img
              src="/src/Shared/assets/infoSectionPoint.svg"
              alt="infoSectionPoint"
              className="w-[20px] absolute z-10 right-[20px] bottom-[20px]"
            />
          </div>
          <img
            src="/src/Shared/assets/bottomLine.svg"
            alt="howToEventRight"
            className="w-3/4"
          />
        </div>
      );
  };
};
export default InfoSection;
