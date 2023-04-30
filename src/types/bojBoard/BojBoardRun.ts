export type BojScoreboardRun = {
  id: number;
  problem: number;
  result: number;
  frozen: boolean;
  team: number;
  time: number;
  partial?: 0 | 1;
  score?: number;
};
