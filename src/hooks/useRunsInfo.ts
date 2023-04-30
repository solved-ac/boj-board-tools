import { BojScoreboardRunsResponse } from "../types/bojBoard/BojBoardRunsResponse";
import { Contest } from "../types/general/Contest";
import {
  Run,
  toRunFromBojRun,
  toRunFromSpotboardRun,
} from "../types/general/Run";
import { SpotboardRunsResponse } from "../types/spotboard/SpotboardRunsResponse";
import useApiGet from "./useApiGet";

export const useRunsInfo = (
  contestId: number,
  contest: Contest | null
): Run[] | null => {
  const runsInfoBojBoard = useApiGet<BojScoreboardRunsResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/board/${contestId}/runs.json`
  );
  const runsInfoSpotboard = useApiGet<SpotboardRunsResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/spotboard/${contestId}/runs.json`
  );

  if (runsInfoBojBoard.data)
    return runsInfoBojBoard.data.runs.map((run) =>
      toRunFromBojRun(run, contest)
    );
  if (runsInfoSpotboard.data)
    return runsInfoSpotboard.data.runs.map(toRunFromSpotboardRun);
  return null;
};
