import { BojScoreboardTeam } from "../bojBoard/BojBoardTeam";
import { SpotboardTeam } from "../spotboard/SpotboardTeam";

export interface Team {
  id: string;
  name: string;
  fullName: string;
}

export const toTeam = (team: BojScoreboardTeam | SpotboardTeam): Team => {
  if ("name" in team) {
    const teamName = /^(.+) \([^)]*\)$/g.exec(team.name)?.[1];
    return {
      id: team.id,
      name: teamName || team.name,
      fullName: team.name,
    };
  }
  return {
    id: team.id.toString(),
    name: team.team,
    fullName: team.team,
  };
};
