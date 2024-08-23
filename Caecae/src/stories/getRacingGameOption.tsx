import huynxios from "../shared/Hyunxios";
import Response from "../utils/Response";

export interface GetRacingGameOptionBodyParameter {
  phone: string;
  selection: number;
}

export interface getRacingGameOptionDTO {
  phone: string;
  selection: number;
}

const setRacingGameOption = async (phone: string, selection: number) => {
  const response = await huynxios.post<Response<getRacingGameOptionDTO>>(
    "/api/racing/option",
    { phone: phone, selection: selection }
  );
  return response;
};
export { setRacingGameOption };
