import { BojScoreboardRun } from "../bojBoard/BojBoardRun";
import { SpotboardRun } from "../spotboard/SpotboardRun";
import { Contest } from "./Contest";

export interface Run {
  id: string;
  problem: number;
  result: "Yes" | "Pending" | "No";
  frozen: boolean;
  team: string;
  submissionTime: number;
  score: number;
}

export const toRunFromBojRun = (
  run: BojScoreboardRun,
  contest: Contest | null
): Run => {
  if (contest?.score) {
    const problemScore = contest.problems[run.problem].score;

    return {
      id: run.id.toString(),
      problem: run.problem,
      result: run.result ? "Yes" : "No",
      frozen: run.frozen,
      team: run.team.toString(),
      submissionTime: run.time,
      score: run.score ?? (run.result ? problemScore : 0),
    };
  }
  return {
    id: run.id.toString(),
    problem: run.problem,
    result: run.result ? "Yes" : "No",
    frozen: run.frozen,
    team: run.team.toString(),
    submissionTime: run.time,
    score: run.result ? 1 : 0,
  };
};

export const toRunFromSpotboardRun = (run: SpotboardRun): Run => ({
  id: run.id,
  problem: run.problem,
  result: run.result,
  frozen: run.frozen,
  team: run.team,
  submissionTime: run.submissionTime,
  score: run.result === "Yes" ? 1 : 0,
});
