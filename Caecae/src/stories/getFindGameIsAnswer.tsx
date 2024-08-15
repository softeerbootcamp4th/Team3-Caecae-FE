import { Story } from "../shared/Hyundux-saga";
import huynxios from "../shared/Hyunxios";
import Response from "../utils/Response";

export interface GetFindFAmeIsAnswerBodyParameter {
  answerList: _Position[];
}

export interface _Position {
  positionX: number;
  positionY: number;
}

export interface getFindGameIsAnswerDTO {
  correctAnswerList: CorrectAnswer[];
  ticketId: string;
  startTime: number;
}
export interface CorrectAnswer {
  positionX: number;
  positionY: number;
  descriptionImageUrl: string;
  title: string;
  content: string;
}

const getFindGameStory: Story = async (object: object) => {
  const response = await huynxios.post<
    Response<GetFindFAmeIsAnswerBodyParameter>
  >("/api/finding/answer", object);
  console.log(response);
  return response;
};

export { getFindGameStory };
