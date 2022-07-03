import { BojScoreboardRunsResponse } from "../types/bojBoard/BojBoardRunsResponse";
import { Run, toRun } from "../types/general/Run";
import { SpotboardRunsResponse } from "../types/spotboard/SpotboardRunsResponse";
import useApiGet from "./useApiGet";

export const useRunsInfo = (contestId: number): Run[] | null => {
  const runsInfoBojBoard = useApiGet<BojScoreboardRunsResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/board/${contestId}/runs.json`
  );
  const runsInfoSpotboard = useApiGet<SpotboardRunsResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/spotboard/${contestId}/runs.json`
  );

  if (runsInfoBojBoard.data) return runsInfoBojBoard.data.runs.map(toRun);
  if (runsInfoSpotboard.data) return runsInfoSpotboard.data.runs.map(toRun);
  return null;
};
