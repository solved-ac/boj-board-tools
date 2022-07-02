import { BojBoardContestResponse } from "../types/bojBoard/BojBoardContestResponse";
import { Contest, toContest } from "../types/general/Contest";
import { SpotboardContestResponse } from "../types/spotboard/SpotboardContestResponse";
import useApiGet from "./useApiGet";

export const useContestInfo = (contestId: number): Contest | null => {
  const contestInfoBojBoard = useApiGet<BojBoardContestResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/board/${contestId}/info.json`
  );
  const contestInfoSpotboard = useApiGet<SpotboardContestResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/spotboard/${contestId}/contest.json`
  );

  if (contestInfoBojBoard.data) return toContest(contestInfoBojBoard.data);
  if (contestInfoSpotboard.data) return toContest(contestInfoSpotboard.data);
  return null;
};
