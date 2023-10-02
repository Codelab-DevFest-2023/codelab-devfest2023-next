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
    <main className="lg:mx-44 mx-4 space-y-4 lg:pt-6 pt-14 pb-20">
      <SearchBox />
      <ul className="movies-list grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
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
