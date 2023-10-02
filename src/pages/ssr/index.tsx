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
      <main className="lg:mx-44 mx-4 space-y-4 lg:pt-6 pt-14 pb-20">
        <SearchBox />
        <ul className="movies-list grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
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
}> = async ({ query: searchParams }) => {
  let movies: Movie[];

  if (searchParams.query) {
    const { results } = await searchMovies(searchParams.query as string);
    movies = results;
  } else {
    const { results } = await fetchPopularMovies();
    movies = results;
  }

  return { props: { movies } };
};

export default SSRPage;
