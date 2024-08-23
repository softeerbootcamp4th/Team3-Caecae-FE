import huynxios from "../../shared/Hyunxios"

interface Response {
    responseCode: string;
    message: string;
    data: boolean;
}

export default async function getRacingGameAvailable() {
    const response = await huynxios.get<Response>("/api/racing/available");

    return response;
}