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

const getFindGameAnswerStory: Story = async (request: object) => {
  const response = await huynxios.post<Response<getFindGameIsAnswerDTO>>(
    "/api/finding/answer",
    request
  );
  return response;
};
export { getFindGameAnswerStory };
