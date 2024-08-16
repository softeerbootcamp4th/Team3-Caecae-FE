import { FindMe } from "./AdminPage";

interface Answer {
  coordX: number;
  coordY: number;
  descriptionImageUrl: string;
  title: string;
  content: string;
}

interface FindMeDTO {
  dayOfEvent: number;
  numberOfWinner: number;
  questionImageUrl: string;
  startTime: string;
  endTime: string;
  answerType: string; //BADGE
  answerInfoList: Answer[];
}

export default function findMeToDTO(data: FindMe): FindMeDTO {
  const answers = data.answers.map((answer): Answer => {
    return {
      coordX: answer.x,
      coordY: answer.y,
      descriptionImageUrl: answer.imageURL,
      title: answer.title,
      content: answer.explain,
    };
  });
  return {
    dayOfEvent: data.day + 1,
    numberOfWinner: 315,
    questionImageUrl: data.questionImageURL,
    startTime: "15:15:00",
    endTime: "14:15:00",
    answerType: data.gameType,
    answerInfoList: answers,
  };
}
