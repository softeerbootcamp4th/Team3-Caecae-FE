import PictureGameBoard from "../Widget/PictureGameBoard/PictureGameBoard";
import {
  action,
  initFindingGameState,
  findingGameReducer,
} from "../Job/FindingGame/FindingGame.tsx";
import useWork from "../Shared/Hyundux/Hooks/useWork.tsx";
import store from "../Shared/Hyundux/Store.tsx";
import { useEffect } from "react";

const FindingGame = () => {
  const state = useWork(initFindingGameState, findingGameReducer);
  //const [elements, setElements] = useState<ReactElement[]>([]);

  useEffect(() => {
    store.dispatch(action.init());
  }, []);

  const imgURL =
    "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/01/b57fdda5-3996-430f-8bf2-65052b1d12b2.jpg";

  const onClickAction = (y: number, x: number) => {
    console.log(y, x);
    store.dispatch(action.click(y, x));
  };

  const showingElements = state.showingAnswers.map((answer) => {
    return (
      <p
        key={answer.id}
        style={{
          left: `${answer.x}px`,
          top: `${answer.y}px`,
          position: "absolute",
        }}
      >
        asdasdads
      </p>
    );
  });
  console.log(state.showingAnswers);
  return (
    <div>
      <PictureGameBoard
        imageURL={imgURL}
        showingElements={showingElements}
        onClickAction={onClickAction}
      />
    </div>
  );
};

export default FindingGame;

// setElements((prev) => {
//   const newElement: ReactElement = (
//     <p
//       key={prev.length}
//       style={{ left: `${x}px`, top: `${y}px`, position: "absolute" }}
//     >
//       asdasdads
//     </p>
//   );
//   const newElements = [...prev, newElement];
//   return newElements;
// });
