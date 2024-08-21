import { Story } from "../../shared/Hyundux-saga";
import huynxios from "../../shared/Hyunxios";
import Response from "../../utils/Response";
import { _Position } from "./getFindGameIsAnswer";

export interface GetFindGAmeHintBodyParameter {
  answerList: _Position[];
}

export interface GetFindGameHintDTO {
  hintPosition: _Position;
}

const getFindGameHintStory: Story = async (object: object) => {
  const response = await huynxios.post<Response<GetFindGAmeHintBodyParameter>>(
    "/api/finding/hint",
    object
  );
  console.log(response);
  return response;
};

export { getFindGameHintStory };
