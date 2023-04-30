import { BojBoardContestResponse } from "../bojBoard/BojBoardContestResponse";
import { SpotboardContestResponse } from "../spotboard/SpotboardContestResponse";
import {
  Problem,
  toProblemFromBojProblem,
  toProblemFromSpotboardProblem,
} from "./Problem";
import { Team, toTeam } from "./Team";

export interface Contest {
  title: string;
  penalty: number;
  problems: Problem[];
  teams: Team[];
  score: boolean;
}

export const toContest = (
  contest: BojBoardContestResponse | SpotboardContestResponse
): Contest => {
  if ("score" in contest) {
    return {
      title: contest.title,
      penalty: +contest.penalty,
      problems: contest.problems.map(toProblemFromBojProblem),
      teams: contest.teams.map(toTeam),
      score: contest.score === 1,
    };
  }
  return {
    title: contest.title,
    penalty: 20,
    problems: contest.problems.map(toProblemFromSpotboardProblem),
    teams: contest.teams.map(toTeam),
    score: false,
  };
};
