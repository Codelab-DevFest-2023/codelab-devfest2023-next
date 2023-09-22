import { Movie } from '@/interfaces/movie.interface';
import {
  API_HEADER,
  DEFAULT_PARAMS,
  PAGINATION,
  QUERY_PARAMS,
} from '@/constants';
import { objectToURLSearchParams } from '@/helpers';
import {
  MovieResponse,
  MoviesRequestPayload,
  ReviewResponse,
} from '@/interfaces/rest';
import { Review } from '@/interfaces/review.interface';

const getMovies = async (
  filters: {
    [key: string]: string | string[] | undefined;
  } = {},
): Promise<MovieResponse> => {
  const queryParams = objectToURLSearchParams(filters);

  if (!queryParams.get(QUERY_PARAMS.PAGE)) {
    queryParams.append(
      QUERY_PARAMS.PAGE,
      PAGINATION.DEFAULT_FIRST_PAGE.toString(),
    );
  }

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

const getMovieDetails = async (movieId: number): Promise<Movie> => {
  const queryParams = new URLSearchParams();
  queryParams.append(QUERY_PARAMS.LANGUAGE, DEFAULT_PARAMS.LANGUAGE);

  const URL = `${
    process.env.NEXT_PUBLIC_API_URL
  }/movie/${movieId}?${queryParams.toString()}`;

  const result = await fetch(`${URL}`, {
    headers: API_HEADER,
  });
  if (!result.ok) {
    throw new Error('Failed to fetch trending movies data');
  }

  return result.json();
};

const searchMovies = async (
  payload: MoviesRequestPayload,
): Promise<MovieResponse> => {
  const queryParams = new URLSearchParams();

  if (payload.search) {
    queryParams.append(QUERY_PARAMS.QUERY, encodeURI(payload.search));
  }

  queryParams.append(
    QUERY_PARAMS.PAGE,
    encodeURI(payload.page.toString() ?? PAGINATION.DEFAULT_FIRST_PAGE),
  );

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

const fetchMovies = async (
  params: {
    [key: string]: string | string[] | undefined;
  } = {},
) => {
  if (params.query) {
    const payload: MoviesRequestPayload = {
      page: Number(params.page ?? PAGINATION.DEFAULT_FIRST_PAGE),
      search: params.query as string,
    };
    return searchMovies(payload);
  }

  return getMovies(params);
};

const getMovieReviews = async (movieId: number): Promise<Review[]> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}/reviews`;

  const result = await fetch(`${URL}`, {
    headers: API_HEADER,
  });

  if (!result.ok) {
    throw new Error('Failed to get movie reviews');
  }

  const data: ReviewResponse = await result.json();
  const reviews = data.results.slice(0, 3);

  return reviews;
};

export {
  getMovies,
  getMovieDetails,
  searchMovies,
  fetchMovies,
  getMovieReviews,
};
