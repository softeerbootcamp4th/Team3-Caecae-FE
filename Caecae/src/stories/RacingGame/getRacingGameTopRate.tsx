import { Story } from "../../shared/Hyundux-saga";
import huynxios from "../../shared/Hyunxios";
import Response from "../../utils/Response";

export interface RacingGameTopRateDTO {
    percent: number;
}

const getRacingGameTopRateStory: Story = async (request: object) => {
    const distanceObject = request as { distance: string}
    const url = `/api/racing/percent?distance=${distanceObject.distance}`
    const response = await huynxios.get<Response<RacingGameTopRateDTO>>(url);

    return response;
};

export  { getRacingGameTopRateStory };