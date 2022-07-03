import { Run } from "../types/general/Run";

export const runsToTeams = (runs: Run[]) => {
  const teamRuns = new Map<string, Run[]>();

  runs.forEach((run) => {
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
      runs.filter((run) => run.result === "Yes").map((run) => run.problem)
    ).size,
  }));
};
