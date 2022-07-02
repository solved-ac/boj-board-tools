import { BojBoardContestResponse } from "../bojBoard/BojBoardContestResponse";
import { SpotboardContestResponse } from "../spotboard/SpotboardContestResponse";
import { Problem, toProblem } from "./Problem";
import { Team, toTeam } from "./Team";

export interface Contest {
  title: string;
  penalty: number;
  problems: Problem[];
  teams: Team[];
}

export const toContest = (
  contest: BojBoardContestResponse | SpotboardContestResponse
): Contest => {
  if ("score" in contest) {
    return {
      title: contest.title,
      penalty: +contest.penalty,
      problems: contest.problems.map(toProblem),
      teams: contest.teams.map(toTeam),
    };
  }
  return {
    title: contest.title,
    penalty: 20,
    problems: contest.problems.map(toProblem),
    teams: contest.teams.map(toTeam),
  };
};
