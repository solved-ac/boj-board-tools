export interface SpotboardRun {
  id: string;
  problem: number;
  result: "Yes" | "Pending" | "No";
  frozen: boolean;
  team: string;
  submissionTime: number; // minutes
}
