import { BojScoreboardProblem } from "./BojBoardProblem";
import { BojScoreboardTeam } from "./BojBoardTeam";

interface BojBoardContestResponseBase {
  id: number;
  start: number;
  end: number;
  title: string;
  score: 0 | 1;
  format: number;
  penalty: string;
  last_penalty: string;
  menu: { title: string; link: string }[];
  problems: BojScoreboardProblem[];
  teams: BojScoreboardTeam[];
}

export type BojBoardContestResponse = BojBoardContestResponseBase &
  (
    | {
        score: 0;
        problems: BojScoreboardProblem[];
      }
    | {
        score: 1;
        problems: (BojScoreboardProblem & { score: number })[];
      }
  );
