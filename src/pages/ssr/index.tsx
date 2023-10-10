import MovieCard from '@/components/movie/card/MovieCard';
import SearchBox from '@/components/search/SearchBox';
import { Movie } from '@/interfaces/movie.interface';
import { fetchPopularMovies, searchMovies } from '@/services/movie.service';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const SSRPage = ({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Server Side Rendering</title>
      </Head>
      <main className="main-container">
        <SearchBox />
        <ul className="movies-list">
          {movies?.map((movie: Movie) => (
            <li key={movie.id}>
              <Link href={`/ssr/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </li>
          ))}
        </ul>
        {movies.length < 1 && (
          <p className="font-medium text-3xl">Aucun résultat</p>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  movies: Movie[];
}> = async ({ query }) => {
  let movies: Movie[];

  if (query.searchKey) {
    const { results } = await searchMovies(query.searchKey as string);
    movies = results;
  } else {
    const { results } = await fetchPopularMovies();
    movies = results;
  }

  return { props: { movies } };
};

export default SSRPage;
