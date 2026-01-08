export interface PendingCompletion {
  id: number;
  demon_id: number;
  proof_link: string;
  status: string;
  user: {
    id: number;
    username: string;
  };
  demon: Demon;
}

export interface Demon {
  id: number;
  name: string;
  creator: string;
  verifier: string;
  ranking: number;
  level_id: number;
  preview_link: string | null;
  thumbnail: string | null;
  points: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
  avatar_url: string | null;
}

export interface Profile {
  id: number;
  username: string;
  total_points: number;
  completions: number[] | Demon[] | null;
}

export interface Completion {
  proof_link: string;
  user: {
    id: number;
    username: string;
  }
}