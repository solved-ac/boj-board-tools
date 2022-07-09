import { SpotboardRun } from "../spotboard/SpotboardRun";
import { BojScoreboardRun } from "../bojBoard/BojBoardRun";

export interface Run {
  id: string;
  problem: number;
  result: "Yes" | "Pending" | "No";
  frozen: boolean;
  team: string;
  submissionTime: number;
}

export const toRun = (run: BojScoreboardRun | SpotboardRun): Run => {
  if ("time" in run) {
    return {
      id: run.id.toString(),
      problem: run.problem,
      result: run.result ? "Yes" : "No",
      frozen: run.frozen,
      team: run.team.toString(),
      submissionTime: run.time,
    };
  }
  return {
    id: run.id,
    problem: run.problem,
    result: run.result,
    frozen: run.frozen,
    team: run.team,
    submissionTime: run.submissionTime,
  };
};
