export interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  genres: { id: string; name: string }[];
  popularity: number;
  release_date?: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
