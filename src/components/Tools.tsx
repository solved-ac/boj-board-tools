import { EmptyStatePlaceholder, Space } from "@solved-ac/ui-react";
import { useMemo, useState } from "react";
import useApiGet from "../hooks/useApiGet";
import { BojBoardContestResponse } from "../types/bojBoard/BojBoardContestResponse";
import { BojScoreboardRunsResponse } from "../types/bojBoard/BojBoardRunsResponse";
import { BojScoreboardTeam } from "../types/bojBoard/BojBoardTeam";
import { runsToTeams } from "../utils/runs";

interface Props {
  contestId: string;
  info: BojBoardContestResponse | null;
}

const Tools: React.FC<Props> = (props) => {
  const { contestId, info } = props;

  const [input, setInput] = useState<string>("0");

  const contestRuns = useApiGet<BojScoreboardRunsResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/board/${contestId}/runs.json`
  );

  const teamsMap = useMemo(() => {
    const m = new Map<number, BojScoreboardTeam>();
    if (!info) return m;
    info.teams.forEach((team) => m.set(team.id, team));
    return m;
  }, [info]);

  const teamDatum = useMemo(() => {
    if (!contestRuns.loaded || contestRuns.error) return [];
    return runsToTeams(contestRuns.data)
      .map((team) => ({
        ...team,
        ...teamsMap.get(team.id),
      }))
      .sort((a, b) => b.solvedCount - a.solvedCount);
  }, [contestRuns, teamsMap]);

  const filteredTeamDatum = useMemo(() => {
    return teamDatum.filter((team) => team.solvedCount >= Number(input));
  }, [teamDatum, input]);

  if (!contestId) {
    return (
      <EmptyStatePlaceholder>대회 ID를 입력해 주세요</EmptyStatePlaceholder>
    );
  }
  if (!contestRuns.loaded || !info) {
    return <EmptyStatePlaceholder>로드 중...</EmptyStatePlaceholder>;
  }
  if (contestRuns.error) {
    return (
      <EmptyStatePlaceholder>{contestRuns.errorMessage}</EmptyStatePlaceholder>
    );
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <h2 style={{ flex: "1 0 0" }}>
          {info.title} ({props.contestId})
        </h2>
        <input
          type="number"
          style={{ flex: "0 0 80px" }}
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ""))}
        />
        솔브 이상
      </div>
      <Space h={16} />
      <textarea
        value={filteredTeamDatum
          .map((team) => team.members?.[0].acmicpc ?? team.team ?? team.id)
          .join(", ")}
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
