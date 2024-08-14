import huynxios from "../shared/Hyunxios";

interface Response {
  responseCode: number;
  message: string;
  data: Data;
}

interface Data {
  findingGameInfos: FindingGameInfo[];
  recentGameIndex: number;
  nextGameIndex: number;
}

interface FindingGameInfo {
  startTime: number[];
  endTime: number[];
  numberOfWinners: number;
}

export default async function getFindingGameStartTime() {
  const response = await huynxios.get<Response>("/api/finding/info");

  return response;
}
