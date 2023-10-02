import { Movie } from '@/interfaces/movie.interface';
import { API_HEADER, DEFAULT_PARAMS, QUERY_PARAMS } from '@/constants';
import { MovieResponse, ReviewResponse } from '@/interfaces/rest';
import { Review } from '@/interfaces/review.interface';

const fetchPopularMovies = async (): Promise<MovieResponse> => {
  const queryParams = new URLSearchParams();

  if (!queryParams.get(QUERY_PARAMS.LANGUAGE)) {
    queryParams.append(QUERY_PARAMS.LANGUAGE, DEFAULT_PARAMS.LANGUAGE);
  }

  const URL = `${
    process.env.NEXT_PUBLIC_API_URL
  }/movie/popular?${queryParams.toString()}`;

  const result = await fetch(`${URL}`, {
    headers: API_HEADER,
    cache: 'no-store',
  });
  if (!result.ok) {
    throw new Error('Failed to fetch trending movies data');
  }

  return result.json();
};

const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  const queryParams = new URLSearchParams();
  queryParams.append(QUERY_PARAMS.LANGUAGE, DEFAULT_PARAMS.LANGUAGE);

  const URL = `${
    process.env.NEXT_PUBLIC_API_URL
  }/movie/${movieId}?${queryParams.toString()}`;

  const result = await fetch(`${URL}`, {
    headers: API_HEADER,
    next: { revalidate: 604800 }, // 7 days
  });
  if (!result.ok) {
    throw new Error('Failed to fetch trending movies data');
  }

  return result.json();
};

const searchMovies = async (search: string): Promise<MovieResponse> => {
  const queryParams = new URLSearchParams();

  if (search) {
    queryParams.append(QUERY_PARAMS.QUERY, encodeURI(search));
  }

  const URL = `${
    process.env.NEXT_PUBLIC_API_URL
  }/search/movie?${queryParams.toString()}`;
  const result = await fetch(`${URL}`, {
    headers: API_HEADER,
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error('Failed to search movies data');
  }

  return result.json();
};

const getMovieReviews = async (movieId: number): Promise<Review[]> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}/reviews`;

  const result = await fetch(`${URL}`, {
    headers: API_HEADER,
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error('Failed to get movie reviews');
  }

  const data: ReviewResponse = await result.json();
  const reviews = data.results.slice(0, 3);

  return reviews;
};

export { fetchPopularMovies, fetchMovieDetails, searchMovies, getMovieReviews };
