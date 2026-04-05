export interface Interview {
  _id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  score: number;
  createdAt: string;
}