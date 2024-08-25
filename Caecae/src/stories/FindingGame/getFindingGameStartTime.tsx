import huynxios from "../../shared/Hyunxios";
import Response from "../../utils/Response";

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
  const response = await huynxios.get<Response<Data>>("/api/finding/info");

  return response;
}
