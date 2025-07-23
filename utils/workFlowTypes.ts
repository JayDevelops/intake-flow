export interface WorkFlowType {
  id: number;
  name: string;
  description: string;
  status: "active" | "draft";
  triggers: number;
  lastRun?: string;
  steps?: { type: string; name: string }[];
}
