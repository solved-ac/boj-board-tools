import { BojScoreboardRun } from "../types/bojBoard/BojBoardRun";
import { BojScoreboardRunsResponse } from "../types/bojBoard/BojBoardRunsResponse";

export const runsToTeams = (runs: BojScoreboardRunsResponse) => {
  const teamRuns = new Map<number, BojScoreboardRun[]>();

  runs.runs.forEach((run) => {
    const arr = teamRuns.get(run.team);
    if (arr === undefined) {
      teamRuns.set(run.team, [run]);
    } else {
      arr.push(run);
    }
  });

  return Array.from(teamRuns.entries()).map(([teamId, runs]) => ({
    id: teamId,
    runs,
    solvedCount: new Set(
      runs.filter((run) => run.result === 1).map((run) => run.problem)
    ).size,
  }));
};
