import { IGenre } from "./genre";

export interface IResponseMovie {
  id: string;
  budget: number;
  tagline: string | null;
  title: string;
  release_date: string;
  user_id: string;
  original_title: string;
  popularity: number;
  revenue: number;
  overview: string;
  status: string;
  embed_trailer_url: string | null;
  trailer_url: string;
  votes: number;
  rating: number;
  duration: number;
  formattedDuration: string;
  image_url: string;
  image_secondary_url: string;
  genres: IGenre[];
  language: string;
  profit: number;
  created_at: Date;
  updated_at: Date;
}

export interface IResponseListMovies {
  data: IResponseMovie[];
  page: number;
  total: number;
  last_page: number;
}

export interface IListMoviesOptions {
  page?: number;
  per_page?: number;
  q?: string;
  genre_ids?: string[];
  duration_range?: "less_than_1h" | "between_1h_and_2h" | "more_than_2h";
  start_release_at?: string;
  end_release_at?: string;
}

export interface ICreateMovie {
  id?: string;
  title: string;
  original_title: string;
  overview: string;
  tagline?: string;
  image: File;
  image_secondary?: File;
  genre_ids?: string[];
  trailer_url: string;
  popularity: number;
  votes: number;
  rating: number;
  release_date: string;
  status: string;
  language: string;
  budget: number;
  revenue: number;
  profit: number;
  duration: number;
}
