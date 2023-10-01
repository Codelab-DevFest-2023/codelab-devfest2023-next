import Like from '@/components/like/Like';
import Note from '@/components/note/Note';
import { Movie } from '@/interfaces/movie.interface';
import { getMovieDetails } from '@/services/movie.service';
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
      <div className="flex md:flex-row flex-col">
        <div className="poster z-10 md:order-first order-last">
          <Image
            src={posterUrl}
            alt={movie.title}
            className="aspect-[2/3] object-cover h-full"
            height={750}
            width={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="description relative w-full">
          <Image
            className="block z-0 object-cover brightness-50"
            alt={movie.title}
            src={backdropPathUrl}
            fill
            priority
          />
          <div className="relative flex flex-col">
            <div className="flex flex-col gap-3 ml-4 text-white mt-3">
              <h1 className="text-xl font-semibold">{movie.title}</h1>
              <div className="flex gap-2">
                {movie.genres.map((genre) => {
                  return <p key={genre.id}>{genre.name}</p>;
                })}
              </div>
              <p>{movie.tagline}</p>
              <p className="mt-2 mr-10">{movie.overview}</p>
              <div className="flex items-center gap-3">
                <Note note={movie.vote_average} />
                <Like id={movie.id} />
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
    const movie = await getMovieDetails(id);
    return { props: { movie } };
  } else {
    throw new Error('Missing id parameter');
  }
};

export default SSRMovieDetailsPage;