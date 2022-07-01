import { SpotboardRun } from "./SpotboardRun";

export interface SpotboardRunsResponse {
  time: {
    contestTime: number;
    noMoreUpdate: boolean;
    timestamp: number;
  };
  runs: SpotboardRun[];
}
