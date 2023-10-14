import Like from '@/components/like/Like';
import Note from '@/components/note/Note';
import { fetchMovieDetails } from '@/services/movie.service';
import Image from 'next/image';

const RSCMovieDetailsPage = async ({ params }: { params: { id: number } }) => {
  const movie = await fetchMovieDetails(params.id);

  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const backdropPathUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

  return (
    <main className="details-page">
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
            <div className="movie-note">
              <Note note={movie.vote_average} />
              <Like id={movie.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RSCMovieDetailsPage;
