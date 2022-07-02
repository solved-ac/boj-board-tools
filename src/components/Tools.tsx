import { EmptyStatePlaceholder, Space, TextField } from "@solved-ac/ui-react";
import { useMemo, useState } from "react";
import useApiGet from "../hooks/useApiGet";
import { useRunsInfo } from "../hooks/useRunsInfo";
import { BojBoardContestResponse } from "../types/bojBoard/BojBoardContestResponse";
import { BojScoreboardRunsResponse } from "../types/bojBoard/BojBoardRunsResponse";
import { BojScoreboardTeam } from "../types/bojBoard/BojBoardTeam";
import { Contest } from "../types/general/Contest";
import { Team } from "../types/general/Team";
import { runsToTeams } from "../utils/runs";

interface Props {
  contestId: string;
  info: Contest | null;
}

const Tools: React.FC<Props> = (props) => {
  const { contestId, info } = props;

  const [input, setInput] = useState<string>("0");

  const runsInfo = useRunsInfo(+contestId);

  const teamsMap = useMemo(() => {
    const m = new Map<string, Team>();
    if (!info) return m;
    info.teams.forEach((team) => m.set(team.id, team));
    return m;
  }, [info]);

  const teamDatum = useMemo(() => {
    if (!runsInfo) return [];
    return runsToTeams(runsInfo)
      .map((team) => ({
        ...team,
        ...teamsMap.get(team.id),
      }))
      .sort((a, b) => b.solvedCount - a.solvedCount);
  }, [runsInfo, teamsMap]);

  const filteredTeamDatum = useMemo(() => {
    return teamDatum.filter((team) => team.solvedCount >= Number(input));
  }, [teamDatum, input]);

  if (!contestId) {
    return (
      <EmptyStatePlaceholder>대회 ID를 입력해 주세요</EmptyStatePlaceholder>
    );
  }
  if (!runsInfo || !info) {
    return <EmptyStatePlaceholder>로드 중...</EmptyStatePlaceholder>;
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <h2 style={{ flex: "1 0 0" }}>
          {info.title} ({props.contestId})
        </h2>
        <TextField<"input">
          type="number"
          style={{ flex: "0 0 80px" }}
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ""))}
        />
        솔브 이상
      </div>
      <Space h={16} />
      <TextField<"textarea">
        multiline
        value={filteredTeamDatum.map((team) => team.name || "").join(", ")}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "unset",
          minHeight: 400,
        }}
      />
    </>
  );
};

export default Tools;
