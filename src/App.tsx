import { Button, Divider, Space } from "@solved-ac/ui-react";
import React, { useState } from "react";
import useApiGet from "./hooks/useApiGet";
import { BojScoreboardInfoResponse } from "./types/BojScoreboardInfoResponse";

const App: React.FC = () => {
  const [contestIdInput, setContestIdInput] = useState<string>("");
  const contestInfo = useApiGet<BojScoreboardInfoResponse>(
    `https://boj-scoreboard-relay.shiftpsh.com/?u=/${contestIdInput}/info.json`
  );

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <header style={{ flex: "2 0 480px" }}>
          <h1>BOJ 스코어보드 툴</h1>
          by <a href="https://solved.ac">solved.ac</a>
        </header>
        <div style={{ flex: "1 0 240px" }}>
          {contestInfo.loaded && !contestInfo.error
            ? contestInfo.data.title
            : "대회 ID"}
          <br />
          <div style={{ display: "flex" }}>
            <input
              type="number"
              placeholder="대회 ID"
              value={contestIdInput}
              onChange={(e) =>
                setContestIdInput(e.target.value.replace(/[^0-9]/g, ""))
              }
              style={{ width: "100%", maxWidth: "unset", flex: "1 0 0" }}
            />
            <Space w={8} />
            <Button
              primary
              style={{ whiteSpace: "nowrap", flex: "0 0 120px" }}
              disabled={!contestInfo.loaded || contestInfo.error}
            >
              {contestInfo.loaded && contestInfo.error
                ? "데이터 없음"
                : "불러오기"}
            </Button>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default App;
