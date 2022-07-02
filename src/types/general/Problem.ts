import { BojScoreboardProblem } from "../bojBoard/BojBoardProblem";
import { SpotboardProblem } from "../spotboard/SpotboardProblem";

export interface Problem {
  title: string;
  number: string;
}

export const toProblem = (
  problem: BojScoreboardProblem | SpotboardProblem
): Problem => {
  if ("color" in problem) {
    return {
      title: problem.title,
      number: problem.name,
    };
  }
  return {
    title: problem.title,
    number: problem.number,
  };
};
