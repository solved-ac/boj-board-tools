import {
  Cell,
  Divider,
  EmptyStatePlaceholder,
  Row,
  Space,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
  Typo
} from "@solved-ac/ui-react";
import { useMemo, useState } from "react";
import { useRunsInfo } from "../hooks/useRunsInfo";
import { Contest } from "../types/general/Contest";
import { Run } from "../types/general/Run";
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

  const problemStats = useMemo(() => {
    if (!info) return [];
    if (!runsInfo) {
      return info.problems.map((p) => ({
        problem: p,
        firstSolveRun: null,
        accepted: 0,
        tried: 0,
      }));
    }

    return info.problems.map((p, i) => {
      const problemRuns: Run[] = runsInfo
        .filter((r) => r.problem === i)
        .sort((a, b) => a.submissionTime - b.submissionTime);
      const frozenRuns = problemRuns.filter((p) => !p.frozen);
      const firstSolveRun = problemRuns
        .filter((p) => p.result !== "No")
        .slice(0, 1);

      return {
        problem: p,
        firstSolveRun: firstSolveRun.length ? firstSolveRun[0] : null,
        accepted: frozenRuns.filter((p) => p.result === "Yes").length,
        tried: frozenRuns.length,
      };
    });
  }, [info, runsInfo]);

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
      <Divider />
      <TableContainer style={{ width: "100%" }}>
        <Table fullWidth>
          <TableHead>
            <Row>
              <Cell>문제 #</Cell>
              <Cell>맞은 제출</Cell>
              <Cell>전체 제출</Cell>
              <Cell>정답률</Cell>
              <Cell>퍼스트 솔브</Cell>
              <Cell>LaTeX</Cell>
            </Row>
          </TableHead>
          <TableBody>
            {problemStats.map((p) => {
              const accepted = p.accepted.toLocaleString();
              const tried = p.tried.toLocaleString();
              const ratio = p.tried
                ? ((p.accepted / p.tried) * 100).toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                : "0.000";
              const firstSolveTeamFull =
                (p.firstSolveRun &&
                  teamsMap.get(p.firstSolveRun.team)?.fullName) ||
                "";
              const firstSolveTeam =
                (p.firstSolveRun && teamsMap.get(p.firstSolveRun.team)?.name) ||
                "";
              const firstSolveContestants =
                firstSolveTeamFull === firstSolveTeam
                  ? ""
                  : firstSolveTeamFull.substring(
                      firstSolveTeam.length,
                      firstSolveTeamFull.length
                    );
              return (
                <Row key={p.problem.number}>
                  <Cell>{p.problem.number}</Cell>
                  <Cell style={{ textAlign: "right" }}>
                    <Typo variant="tabular">{accepted}</Typo>
                  </Cell>
                  <Cell style={{ textAlign: "right" }}>
                    <Typo variant="tabular">{tried}</Typo>
                  </Cell>
                  <Cell style={{ textAlign: "right" }}>
                    <Typo variant="tabular">{ratio}%</Typo>
                  </Cell>
                  <Cell>
                    {p.firstSolveRun ? (
                      <>
                        {p.firstSolveRun.result === "Yes"
                          ? firstSolveTeam
                          : "???"}
                      </>
                    ) : (
                      <>&ndash;</>
                    )}
                  </Cell>
                  <Cell>
                    <pre>{`\\begin{itemize}
\\item 프리즈 전까지 제출 ${tried}번, 정답 ${accepted}팀 (정답률 ${ratio}\\%)
\\item 처음 푼 팀: ${
                      p.firstSolveRun && p.firstSolveRun.result === "Yes"
                        ? `\\textbf{${firstSolveTeam}}${firstSolveContestants}, ${p.firstSolveRun.submissionTime}분`
                        : "???"
                    }
\\item 출제자: \\texttt{ ... }
\\end{itemize}`}</pre>
                  </Cell>
                </Row>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Tools;
