import { ChangeEvent, useState } from "react";
import PictureGameBoard from "../../components/common/PictureGameBoard";
import huynxios from "../../shared/Hyunxios";
import findMeToDTO from "./FindMeToDTO";
import Response from "../../utils/Response";
import { WinnerDTO } from "./WinnerDTO";

export interface FindMe {
  day: number;
  winner: number;
  startTime: string;
  endTime: string;
  gameType: string;
  questionImageURL: string;
  answers: FindMeAnswer[];
}

interface FindMeAnswer {
  id: number;
  title: string;
  explain: string;
  imageURL: string;
  x: number;
  y: number;
}

const defaultFindMe: FindMe = {
  day: 0,
  winner: 0,
  startTime: "",
  endTime: "",
  gameType: "PICXEL",
  questionImageURL: "",
  answers: [],
};

const defaultFindMeAnswer: FindMeAnswer = {
  id: 0,
  title: "",
  explain: "",
  imageURL: "",
  x: 0,
  y: 0,
};

const days = [
  "첫째 날",
  "둘째 날",
  "셋째 날",
  "넷째 날",
  "다섯째 날",
  "여섯째 날",
  "일곱째 날",
];

const AdminPage = () => {
  const [findmes, setFindMes] = useState<FindMe[]>(
    new Array(7).fill(0).map((_, index) => {
      return { ...defaultFindMe, day: index };
    })
  );
  const [day, setDay] = useState(0);
  const [answer, setAnswer] = useState<FindMeAnswer>(defaultFindMeAnswer);
  const [mode, setMode] = useState("findme");
  const [winnders, setWinnders] = useState<WinnerDTO[]>([]);

  function changeQuestionURL(url: string) {
    const newFindme = [...findmes];
    newFindme[day].questionImageURL = url;
    setFindMes(newFindme);
  }

  function changeMode(mode: string) {
    setMode(mode);
  }

  function changeAnswer(answer: FindMeAnswer) {
    setAnswer(() => {
      return { ...answer };
    });
  }

  const winnerData = winnders.map((winner) => {
    return (
      <tr>
        <td>{winner.ranking}</td>
        <td>{winner.phone}</td>
        <td>{winner.distance}</td>
        <td>{winner.selection}</td>
      </tr>
    );
  });
  async function getWinners() {
    const response = await huynxios.post<Response<WinnerDTO[]>>(
      "/api/admin/racing/winners",
      {}
    );
    setWinnders(response.data);
  }

  const tableData = findmes[day].answers.map((eachAnswer) => {
    return (
      <tr>
        <td>
          {
            <p>
              {eachAnswer.y} <br /> {eachAnswer.x}
            </p>
          }
        </td>
        <td>{eachAnswer.title}</td>
        <td>{eachAnswer.explain}</td>
        <td>{eachAnswer.imageURL}</td>
      </tr>
    );
  });

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    isQuestion: boolean = false
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const url = await imageToURL(file, isQuestion);
        alert(url);
        if (isQuestion) {
          changeQuestionURL(url);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a JPG file.");
    }
  };

  const content =
    mode === "findme" ? (
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col">
          <div className="flex gap-[30px]">
            {days.map((_day, index) => (
              <DayBtn
                key={`${index}` + day}
                day={index}
                data={_day}
                isOn={index === day}
                onclick={(day) => {
                  setDay(day);
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-[14px]">당첨 인원</p>
          <div className="w-[30px]"></div>
          <input
            type="text"
            value={findmes[day].winner}
            onChange={(str) => {
              const newFindme = [...findmes];
              newFindme[day].winner = Number(str.target.value);
              setFindMes(newFindme);
            }}
            className="border border-black p-1"
            placeholder="Enter text here"
          />
          <p className="text-[14px]">명</p>
        </div>
        <div className="flex items-center">
          <p className="text-[14px]">시작 시간</p>
          <div className="w-[30px]"></div>
          <input
            type="datetime-local"
            value={findmes[day].startTime}
            onChange={(str) => {
              const newFindme = [...findmes];
              newFindme[day].startTime = str.target.value;
              setFindMes(newFindme);
            }}
            className="border border-black p-1"
            placeholder="Enter text here"
          />
        </div>
        <div className="flex items-center">
          <p className="text-[14px]">종료 시간</p>
          <div className="w-[30px]"></div>
          <input
            type="datetime-local"
            value={findmes[day].endTime}
            onChange={(str) => {
              const newFindme = [...findmes];
              newFindme[day].endTime = str.target.value;
              setFindMes(newFindme);
            }}
            className="border border-black p-1"
            placeholder="Enter text here"
          />
        </div>
        <div className="flex items-center">
          <p className="text-[14px]">정답 유형</p>
          <div className="w-[30px]"></div>
          <input
            type="text"
            value={findmes[day].gameType}
            onChange={(str) => {
              const newFindme = [...findmes];
              newFindme[day].gameType = str.target.value;
              setFindMes(newFindme);
            }}
            className="border border-black p-1"
            placeholder="Enter text here"
          />
        </div>
        <div className="flex gap-[50px] relative">
          <div className="w-[473.7036px] h-[400px] bg-slate-300 overflow-hidden">
            <PictureGameBoard
              imageURL={findmes[day].questionImageURL}
              showingElements={[]}
              onClickAction={(
                width: number,
                height: number,
                y: number,
                x: number
              ) => {
                width;
                height;
                const newAnswer = { ...answer };
                newAnswer.y = y / 400;
                newAnswer.x = x / 473.7036;
                setAnswer(newAnswer);
              }}
            />
          </div>
          <div className="w-1/4">
            <table className="w-full">
              <thead className="bg-slate-200">
                <td className="border border-gray-600">no</td>
                <td className="border border-gray-600">정답</td>
                <td className="border border-gray-600">설명</td>
                <td className="border border-gray-600">이미지 소스</td>
              </thead>
              <tbody>{tableData}</tbody>
              <tfoot>
                <td>
                  <input
                    type="text"
                    value={`${answer.y}\n${answer.x}`}
                    className="border border-black p-1"
                    placeholder="Enter text here"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={answer.title}
                    onChange={(str) => {
                      const before = { ...answer };
                      before.title = str.target.value;
                      changeAnswer(before);
                    }}
                    className="border border-black p-1"
                    placeholder="Enter text here"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={answer.explain}
                    onChange={(str) => {
                      const before = { ...answer };
                      before.explain = str.target.value;
                      changeAnswer(before);
                    }}
                    className="border border-black p-1"
                    placeholder="Enter text here"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={answer.imageURL}
                    onChange={(str) => {
                      const before = { ...answer };
                      before.imageURL = str.target.value;
                      changeAnswer(before);
                    }}
                    className="border border-black p-1"
                    placeholder="Enter text here"
                  />
                </td>
              </tfoot>
            </table>
          </div>
          <div
            className="absolute right-[20px] bottom-[20px] flex items-center justify-center bg-gray-400 w-[100px] h-[40px]"
            onClick={() => {
              const newFindMe = [...findmes];

              newFindMe[day].answers = [...newFindMe[day].answers, answer];
              setFindMes(newFindMe);
            }}
          >
            <p>저장하기</p>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col">
        <div className="flex items-center">
          <p className="text-[14px]">이벤트 상태</p>
          <div className="w-[30px]"></div>
          <input
            type="text"
            className="border border-black p-1"
            placeholder="Enter text here"
          />
          <div className="w-[30px]"></div>
          <div
            className="bg-slate-300 flex justify-center items-center w-[200px] h-[40px]"
            onClick={() => getWinners()}
          >
            <p>let's 당첨</p>
          </div>
        </div>
        <table className="w-full mt-[30px]">
          <thead className="bg-slate-200">
            <td className="border border-gray-600">랭킹</td>
            <td className="border border-gray-600">전화번호</td>
            <td className="border border-gray-600">거리</td>
            <td className="border border-gray-600">옵션</td>
          </thead>
          <tbody>{winnerData}</tbody>
        </table>
      </div>
    );

  <div className="flex items-center">
    <p className="text-[14px]">당첨 인원</p>
    <div className="w-[30px]"></div>
    <input
      type="text"
      className="border border-black p-1"
      placeholder="Enter text here"
    />
    <p className="text-[14px]">명</p>
  </div>;

  return (
    <div className="flex flex-col p-[24px]">
      <div className="flex justify-between justify-center items-center">
        <p className="text-[40px] font-bold">이벤트 설정</p>
        <div className="flex gap-[20px]">
          <input
            className="bg-gray-200"
            type="file"
            accept="image/jpeg"
            onChange={(event) => handleImageChange(event, true)}
          />
          <input type="file" accept="image/jpeg" onChange={handleImageChange} />
          <div
            className="bg-gray-400 w-[100px] h-[40px] flex items-center justify-center"
            onClick={async () => {
              await huynxios.post(
                "/api/admin/finding/answer",
                findMeToDTO(findmes[day])
              );
            }}
          >
            <p>저장하기</p>
          </div>
        </div>
      </div>
      <p className="text-[20px] font-semibold">기본 설정</p>
      <div className="flex items-center">
        <p className="text-[14px]">이벤트 기간</p>
        <div className="w-[30px]"></div>
        <input
          type="text"
          className="border border-black p-1"
          placeholder="Enter text here"
        />
        <div className="w-[30px]"></div>
        <input
          type="text"
          className="border border-black p-1"
          placeholder="Enter text here"
        />
      </div>
      <p className="text-[20px] font-semibold">상세 이벤트 설정</p>
      <div className="flex">
        <p
          className="text-[14px]"
          onClick={() => {
            changeMode("findme");
          }}
        >
          나를 찾아봐
        </p>
        <div className="w-[30px]"></div>
        <p
          className="text-[14px]"
          onClick={() => {
            changeMode("");
          }}
        >
          전력으로 513km
        </p>
      </div>
      {content}
    </div>
  );
};

const DayBtn = ({
  day,
  data,
  onclick,
  isOn = false,
}: {
  day: number;
  data: string;
  isOn?: boolean;
  onclick: (day: number) => void;
}) => {
  return (
    <div
      className="flex justify-center items-center border border-black w-[150px] h-[40px]"
      onClick={() => onclick(day)}
    >
      {isOn ? (
        <p className="text-[14px] font-bold">{data}</p>
      ) : (
        <p className="text-[14px]">{data}</p>
      )}
    </div>
  );
};

async function imageToURL(data: Blob, isQuestion = false) {
  const formdata = new FormData();
  formdata.append("file", data);
  formdata.append("directory", isQuestion ? "question" : "answer");

  const requestOptions: RequestInit = {
    method: "POST",
    body: formdata,
    headers: new Headers(),
    credentials: "include",
    redirect: "follow",
  };

  const response = await await fetch(
    "http://43.201.185.99:8080/api/admin/s3",
    requestOptions
  );
  const result = (await response.json()) as {
    responseCode: number;
    message: string;
    data: {
      imageUrl: string;
    };
  };
  return result.data.imageUrl;
}

export default AdminPage;
