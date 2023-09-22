'use client';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="w-full bg-primary z-50 fixed top-0 left-0 right-0">
      <div className="flex items-center bg-primary lg:mx-44 lg:justify-between lg:py-5  lg:gap-0 gap-6 mx-4 py-2">
        <Link href="/" className="flex gap-4 items-center -m-1.5 p-1.5">
          <Image
            src="/logo/popcorn.jpg"
            alt="Logo popcorn"
            width={40}
            height={40}
          />
          <span className="hidden sm:block text-white font-semibold leading-6 xl:text-lg text-base">
            Rendu front, action !
          </span>
        </Link>

        <ul className="text-white grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <li>
            <Link
              href="/ssr"
              className="flex items-center gap-2 font-semibold leading-6 xl:text-lg text-base"
            >
              Serveur Side Rendering
            </Link>
          </li>
          <li>
            <Link
              href="/ssg"
              className="flex items-center gap-2 font-semibold leading-6 xl:text-lg text-base"
            >
              Static Site Generation
            </Link>
          </li>
          <li>
            <Link
              href="/rsc"
              className="flex items-center gap-2 font-semibold leading-6 xl:text-lg text-base"
            >
              React Server Component
            </Link>
          </li>
        </ul>

        <Image
          className="lg:block hidden"
          src="/logo/popcorn.jpg"
          alt="Logo popcorn"
          width={40}
          height={40}
        />
      </div>
    </nav>
  );
};

export default Header;
