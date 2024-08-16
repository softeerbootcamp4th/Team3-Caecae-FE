import { Story } from "../shared/Hyundux-saga";
import huynxios from "../shared/Hyunxios";
import Response from "../utils/Response";

export interface FindGame {
  availiable: boolean;
  info: Info;
}

export interface Info {
  questionImageUrl: string;
  answerType: string;
}

const getFindGameStory: Story = async () => {
  const response = await huynxios.get<Response<FindGame>>("/api/finding/start");

  return response;
};

export { getFindGameStory };
