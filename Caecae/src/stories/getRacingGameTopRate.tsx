import huynxios from "../shared/Hyunxios";

interface Response {
    responseCode: number;
    message: string;
    data: Data;
}

interface Data {
    percent: number;
}

export default async function getRacingGameTopRate(score: number) {
    const response = await huynxios.get<Response>("/api/racing/percent?distance=" + score);
    return response;
}