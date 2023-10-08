import { Movie } from '@/interfaces/movie.interface';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const releaseDate = movie.release_date
    ? format(parseISO(movie.release_date), 'dd MMMM yyyy', {
        locale: fr,
      })
    : 'Non défini';
  const posterUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

  return (
    <div className="rounded-xl bg-white shadow-2xl h-full w-full">
      {movie?.poster_path && (
        <div className="relative">
          <img
            src={posterUrl}
            alt={movie.title}
            className="movie-poster"
            height={750}
            width={500}
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-t-lg">
            <p className="text-white text-4xl font-bold">
              {movie.vote_average}
            </p>
          </div>

          <div className="lg:hidden absolute z-10 -bottom-6 flex justify-center items-center bg-white border border-gray right-1/2 rounded-full p-2 h-10 w-10">
            <p className="text-black text-sm font-medium">
              {movie.vote_average}
            </p>
          </div>
        </div>
      )}

      <div className="movie-description py-6 px-4">
        <h5 className="text-2xl font-medium text-black uppercase truncate">
          {movie.title}
        </h5>
        <p className="mb-4 font-light text-black capitalize truncate">
          {movie.original_title}
        </p>
        <p className="font-light">Date de sortie : {releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
