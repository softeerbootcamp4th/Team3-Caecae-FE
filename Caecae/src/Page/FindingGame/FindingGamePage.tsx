import FindingGame from "../../Component/FindingGame";

const FindingGamePage = () => {
  return (
    <div className="flex flex-row h-full">
      <div className="w-[66%] h-full">
        <FindingGame />
      </div>
      <div className="grow h-full">as</div>
    </div>
  );
};
export default FindingGamePage;
