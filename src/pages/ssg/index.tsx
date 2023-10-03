import MovieCard from '@/components/movie/card/MovieCard';
import { Movie } from '@/interfaces/movie.interface';
import { fetchPopularMovies } from '@/services/movie.service';
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
      <main className="main-container">
        <ul className="movies-list">
          {movies?.map((movie: Movie) => (
            <li key={movie.id}>
              <Link href={`/ssg/${movie.id}`}>
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
  const { results: movies } = await fetchPopularMovies();
  return { props: { movies } };
};

export default SSGPage;
