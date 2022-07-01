import { Button, Divider, Space, TextField, Typo } from "@solved-ac/ui-react";
import React, { useState } from "react";
import Tools from "./components/Tools";
import useApiGet from "./hooks/useApiGet";
import { BojScoreboardInfoResponse } from "./types/BojScoreboardInfoResponse";

const App: React.FC = () => {
  const [contestIdInput, setContestIdInput] = useState<string>("");
  const [contestId, setContestId] = useState<string>("");
  const [contestInfoCache, setContestInfoCache] =
    useState<BojScoreboardInfoResponse | null>(null);
  const contestInfo = useApiGet<BojScoreboardInfoResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/board/${contestIdInput}/info.json`
  );

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <header style={{ flex: "2 0 0", minWidth: 480 }}>
          <Typo h1 no-margin>
            BOJ 스코어보드 툴
          </Typo>
          by <a href="https://solved.ac">solved.ac</a>
        </header>
        <div style={{ flex: "1 0 0", minWidth: 240 }}>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {contestInfo.loaded && !contestInfo.error
              ? contestInfo.data.title
              : "대회 ID"}
          </div>
          <Space h={8} />
          <div style={{ display: "flex" }}>
            <TextField<"input">
              type="number"
              placeholder="대회 ID"
              value={contestIdInput}
              onChange={(e) =>
                setContestIdInput(e.target.value.replace(/[^0-9]/g, ""))
              }
              onKeyDown={(e) => {
                if (!contestInfo.loaded || contestInfo.error) return;
                if (e.key === "Enter") {
                  setContestId(contestIdInput);
                  setContestInfoCache(contestInfo.data);
                }
              }}
              style={{ width: "100%", maxWidth: "unset", flex: "1 0 0" }}
            />
            <Space w={8} />
            <Button
              primary
              style={{ whiteSpace: "nowrap", flex: "0 0 120px" }}
              disabled={!contestInfo.loaded || contestInfo.error}
              onClick={() => {
                if (!contestInfo.loaded || contestInfo.error) return;
                setContestId(contestIdInput);
                setContestInfoCache(contestInfo.data);
              }}
            >
              {contestInfo.loaded && contestInfo.error
                ? "데이터 없음"
                : "불러오기"}
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <Tools contestId={contestId} info={contestInfoCache} />
    </div>
  );
};

export default App;
