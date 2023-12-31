import { Movie } from '@/interfaces/movie.interface';
import { API_HEADER } from '@/constants';
import { MovieResponse, ReviewResponse } from '@/interfaces/rest';
import { Review } from '@/interfaces/review.interface';

const fetchPopularMovies = async (): Promise<MovieResponse> => {
  console.log('Request - Fetching popular movies');

  const queryParams = new URLSearchParams();

  if (!queryParams.get('language')) {
    queryParams.append('language', 'fr-FR');
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
  console.log('Request - Fetching movie details');

  const queryParams = new URLSearchParams();
  queryParams.append('language', 'fr-FR');

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
    queryParams.append('query', encodeURI(search));
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

const fetchMovieReviews = async (movieId: number): Promise<Review[]> => {
  console.log('Request - Fetching movie reviews');

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

export {
  fetchPopularMovies,
  fetchMovieDetails,
  searchMovies,
  fetchMovieReviews,
};
