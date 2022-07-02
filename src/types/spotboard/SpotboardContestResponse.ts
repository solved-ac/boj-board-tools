import { SpotboardProblem } from "./SpotboardProblem";
import { SpotboardTeam } from "./SpotboardTeam";

export interface SpotboardContestResponse {
  title: string;
  systemName: string;
  systemVersion: string;
  problems: SpotboardProblem[];
  groups: unknown[];
  teams: SpotboardTeam[];
}
