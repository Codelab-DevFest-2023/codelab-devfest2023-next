import Note from '@/components/note/Note';
import { Movie } from '@/interfaces/movie.interface';
import { fetchMovieDetails } from '@/services/movie.service';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const SSRMovieDetailsPage = ({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const backdropPathUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

  return (
    <main>
      <Head>
        <title>Server Side Rendering</title>
      </Head>
      <div className="details-page">
        <div className="poster">
          <Image
            src={posterUrl}
            alt={movie.title}
            className="poster-image"
            height={750}
            width={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="relative-full">
          <Image
            className="movie-backdrop"
            alt={movie.title}
            src={backdropPathUrl}
            fill
            priority
          />
          <div className="movie-description">
            <div className="informations">
              <h1 className="movie-title">{movie.title}</h1>
              <div className="movie-genre">
                {movie.genres.map((genre) => {
                  return <p key={genre.id}>{genre.name}</p>;
                })}
              </div>
              <p>{movie.tagline}</p>
              <p className="movie-overview">{movie.overview}</p>
              <div className="">
                <Note note={movie.vote_average} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<{
  movie: Movie;
}> = async ({ params }) => {
  if (params?.id) {
    const id = Number(params.id);
    const movie = await fetchMovieDetails(id);
    return { props: { movie } };
  } else {
    throw new Error('Missing id parameter');
  }
};

export default SSRMovieDetailsPage;
