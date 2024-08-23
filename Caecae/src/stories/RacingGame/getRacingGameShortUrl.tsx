import huynxios from "../../shared/Hyunxios"
import Response from "../../utils/Response";

export interface getRacingGameShortUrlBodyParameter {
    distance: number;
    percentage: number;
}

export interface getRacingGameShortUrlDTO {
    shortUrl: string;
}

export default async function getRacingGameShortUrl(object: object) {
    const response = await huynxios.post<Response<getRacingGameShortUrlDTO>>(
        "/api/url/share",
        object
    );
    return response;
};

export { getRacingGameShortUrl };
