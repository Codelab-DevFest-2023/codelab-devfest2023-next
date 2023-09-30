import MovieCard from '@/components/movie/card/MovieCard';
import SearchBox from '@/components/search/SearchBox';
import { transformParsedUrlQuery } from '@/helpers';
import { Movie } from '@/interfaces/movie.interface';
import { fetchMovies } from '@/services/movie.service';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

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
              <MovieCard movie={movie}  />
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
}> = async ({ query: params }) => {
  const searchParams = transformParsedUrlQuery(params);
  const { results: movies } = await fetchMovies(searchParams);
  return { props: { movies } };
};

export default SSRPage;
