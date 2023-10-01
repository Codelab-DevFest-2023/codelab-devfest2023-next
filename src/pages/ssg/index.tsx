import MovieCard from '@/components/movie/card/MovieCard';
import { Movie } from '@/interfaces/movie.interface';
import { getMovies } from '@/services/movie.service';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const SSGPage = ({
  movies,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Static Site Generation</title>
      </Head>
      <main className="lg:mx-44 mx-4 space-y-4 lg:pt-6 pt-14 pb-20">
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

export const getStaticProps: GetStaticProps<{
  movies: Movie[];
}> = async () => {
  const { results: movies } = await getMovies();
  return { props: { movies } };
};

export default SSGPage;
