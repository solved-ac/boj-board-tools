import { BojScoreboardRun } from "./BojBoardRun";

export interface BojScoreboardRunsResponse<T extends 0 | 1 = 0> {
  timestamp: number;
  runs: BojScoreboardRun<T>[];
  users: number;
  problems: number;
  noUpdate: boolean;
  reload: boolean;
}
