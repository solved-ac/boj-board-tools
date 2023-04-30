import { BojScoreboardRun } from "./BojBoardRun";

export interface BojScoreboardRunsResponse {
  timestamp: number;
  runs: BojScoreboardRun[];
  users: number;
  problems: number;
  noUpdate: boolean;
  reload: boolean;
}
