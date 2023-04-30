import { BojScoreboardProblem } from "../bojBoard/BojBoardProblem";
import { SpotboardProblem } from "../spotboard/SpotboardProblem";

export interface Problem {
  title: string;
  number: string;
  score: number;
}

export const toProblemFromBojProblem = (
  problem: BojScoreboardProblem
): Problem => {
  return {
    title: problem.title,
    number: problem.number,
    score: problem.score || 1,
  };
};

export const toProblemFromSpotboardProblem = (
  problem: SpotboardProblem
): Problem => {
  return {
    title: problem.title,
    number: problem.name,
    score: 1,
  };
};
