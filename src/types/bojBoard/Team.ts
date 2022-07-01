import { BojScoreboardTeam } from "./BojBoardTeam";

export interface Team extends BojScoreboardTeam {
  score: number;
  penalty: number;
}
