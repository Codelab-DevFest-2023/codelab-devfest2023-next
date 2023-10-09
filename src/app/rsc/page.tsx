import MovieCard from '@/components/movie/card/MovieCard';
import SearchBox from '@/components/search/SearchBox';
import { Movie } from '@/interfaces/movie.interface';
import { searchMovies, fetchPopularMovies } from '@/services/movie.service';
import Link from 'next/link';

export const revalidate = 0;

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const RSCPage = async ({ searchParams }: Props) => {
  let movies: Movie[];

  if (searchParams.query) {
    const { results } = await searchMovies(searchParams.query as string);
    movies = results;
  } else {
    const { results } = await fetchPopularMovies();
    movies = results;
  }

  return (
    <main className="main-container">
      <SearchBox />
      <ul className="movies-list">
        {movies?.map((movie: Movie) => (
          <li key={movie.id}>
            <Link href={`/rsc/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </li>
        ))}
      </ul>
      {movies.length < 1 && (
        <p className="font-medium text-3xl">Aucun résultat</p>
      )}
    </main>
  );
};

export default RSCPage;
