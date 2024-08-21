import { Story } from "../shared/Hyundux-saga";
import huynxios from "../shared/Hyunxios"
import Response from "../utils/Response";

export interface GetRacingGameOptionBodyParameter {
    phone: string;
    selection: number;
}

export interface getRacingGameOptionDTO {
    phone: string;
    selection: number;
}

const getRacingGameOption: Story = async (request: object) => {
    const optionObject = request as { phone: string, selection: number }
    const response = await huynxios.post<Response<getRacingGameOptionDTO>>(
        "/api/racing/option",
        request
    );
    return response;
};
export { getRacingGameOption };
