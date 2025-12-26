export interface Demon {
  id: number;
  name: string;
  creator: string;
  verifier: string;
  ranking: number;
  level_id: number;
  preview_link: string;
  thumbnail: string;
}

export interface Profile {
  id: number;
  username: string;
  total_points: number;
  completions: number[];
}