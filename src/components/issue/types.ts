export interface Subtask {
  id: string;
  title: string;
  isDone: boolean;
}

export interface LinkedItem {
  id: string;
  title: string;
  type: "link" | "blocker";
}

export interface Property {
  icon: any;
  label: string;
  value?: string;
  color?: string;
}
