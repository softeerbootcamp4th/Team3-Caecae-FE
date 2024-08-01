import { ReactNode } from "react";

interface InfoSectionProps {
  width?: number;
  title: string;
  children: ReactNode;
}

const InfoSection = ({ width = 1200, title, children }: InfoSectionProps) => {
  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src="/src/Shared/assets/sectionContentHeader.svg"
          alt="howToEventLeft"
          className={"w-[" + width + "px]"}
        />
        <p className="absolute text-[white] font-galmuri text-[28px]">
          {title}
        </p>
      </div>
      <div className=" border-l-4 border-r-4 border-white relative">
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
        className={"w-[" + width + "px]"}
      />
    </>
  );
};
export default InfoSection;
