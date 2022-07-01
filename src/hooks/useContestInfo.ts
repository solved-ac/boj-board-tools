import { BojBoardContestResponse } from "../types/bojBoard/BojBoardContestResponse";
import { SpotboardContestResponse } from "../types/spotboard/SpotboardContestResponse";
import useApiGet from "./useApiGet";

export type ContestInfo =
  | { type: "bojBoard"; data: BojBoardContestResponse }
  | { type: "spotboard"; data: SpotboardContestResponse };

export const useContestInfo = (
  contestId: number
):
  | { type: "bojBoard"; data: BojBoardContestResponse }
  | { type: "spotboard"; data: SpotboardContestResponse }
  | null => {
  const contestInfoBojBoard = useApiGet<BojBoardContestResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/board/${contestId}/info.json`
  );
  const contestInfoSpotboard = useApiGet<SpotboardContestResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/spotboard/${contestId}/contest.json`
  );

  if (contestInfoBojBoard.data)
    return { type: "bojBoard", data: contestInfoBojBoard.data };
  if (contestInfoSpotboard.data)
    return { type: "spotboard", data: contestInfoSpotboard.data };
  return null;
};
