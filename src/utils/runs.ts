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

  return Array.from(teamRuns.entries()).map(([teamId, runs]) => {
    const scoreMap = new Map<number, number>();
    runs.forEach((run) => {
      const prevScore = scoreMap.get(run.problem);
      if (prevScore === undefined) {
        scoreMap.set(run.problem, run.score);
      } else {
        scoreMap.set(run.problem, Math.max(prevScore, run.score));
      }
    });
    const scoreArr = Array.from(scoreMap.entries());

    return {
      id: teamId,
      runs,
      solvedCount: scoreArr.filter(([, score]) => score > 0).length,
      score: scoreArr.reduce((acc, [, score]) => acc + score, 0),
    };
  });
};
