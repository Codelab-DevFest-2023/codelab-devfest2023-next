import Like from '@/components/like/Like';
import MovieReview from '@/components/movie/review/MovieReview';
import Note from '@/components/note/Note';
import { Review } from '@/interfaces/review.interface';
import { fetchMovieDetails, getMovieReviews } from '@/services/movie.service';
import Image from 'next/image';

const RSCMovieDetailsPage = async ({ params }: { params: { id: number } }) => {
  const [movie, reviews] = await Promise.all([
    fetchMovieDetails(params.id),
    getMovieReviews(params.id),
  ]);

  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const backdropPathUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

  return (
    <main className="flex md:flex-row flex-col">
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
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-4">
            {reviews.map((review: Review) => (
              <MovieReview key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RSCMovieDetailsPage;
