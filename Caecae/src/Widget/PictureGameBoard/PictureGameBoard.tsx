import { ReactElement } from "react";
import useComponentPosition from "../../Shared/Hooks/useComponentRect";

interface PictureGameBoardProps {
  imageURL: string;
  showingElements: ReactElement[];
  onClickAction: (y: number, x: number) => void;
}

const PictureGameBoard = ({
  imageURL,
  showingElements = [],
  onClickAction,
}: PictureGameBoardProps) => {
  const [ref, position] = useComponentPosition();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { y, x } = {
      y: event.clientY - position.y,
      x: event.clientX - position.x,
    };
    onClickAction(y, x);
  };

  return (
    <div ref={ref} onClick={handleClick} className="relative">
      <div className="z-10 w-full h-full">{showingElements}</div>
      <img src={imageURL} alt="Finding Picture" className="w-full h-full" />
    </div>
  );
};

export default PictureGameBoard;
