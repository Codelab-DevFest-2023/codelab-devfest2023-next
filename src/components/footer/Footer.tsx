import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary text-white z-50 rounded-t-lg fixed bottom-0 left-0 right-0 text-xs">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className=" text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <span>Rendu front, action !</span>
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <p>
            Conférence proposée par Olivier THIERRY - Ryan BALOJI - Clémentine
            ROBERT
          </p>
          <p>
            Api utilisée :{' '}
            <Link
              href="https://developer.themoviedb.org/reference/intro/getting-started"
              className="hover:underline text-blue-600"
            >
              TMDB (The Movie Database)
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
