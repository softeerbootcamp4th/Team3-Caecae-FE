import { ReactElement } from "react";
import useComponentPosition from "../../../hooks/useComponentRect";

interface PictureGameBoardProps {
  imageURL: string;
  showingElements: ReactElement[];
  onClickAction: (width: number, height: number, y: number, x: number) => void;
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
    onClickAction(position.width, position.height, y, x);
  };

  return (
    <div ref={ref} onClick={handleClick} className="relative">
      <div className="absolute inset-0 z-20 w-full h-full">
        {showingElements}
      </div>
      <div className="relative w-full h-screen">
        <img
          src={imageURL}
          alt="Finding Picture"
          className="absolute inset-0 w-full object-fit z-10 object-left"
        />
      </div>
    </div>
  );
};

export default PictureGameBoard;
