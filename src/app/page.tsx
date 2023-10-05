import Image from 'next/image';

const HomePage = () => {
  return (
    <main className="flex flex-col h-full bg-secondary">
      <div className="hidden xl:block w-full h-10 bg-film-strip"></div>
      <div className="flex items-center h-full text-white">
        <div className="flex justify-center items-center">
          <Image
            alt="image alien"
            src="/images/alien.png"
            height={50}
            width={400}
          />
        </div>
        <div className="flex flex-col items-center gap-6 grow">
          <Image
            alt="logo devfest"
            src="/logo/devfest.svg"
            height={400}
            width={400}
          />
          <h1 className="lg:text-6xl md:text-5xl text-4xl font-medium text-center mb-4">
            Rendu front, Action !
          </h1>
          <p className="lg:text-4xl md:text-3xl text-2xl text-center">
            Découvrez les différents modes de rendu avec Next.js
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image
            alt="image ghost buster"
            src="/images/ghost-buster.png"
            height={50}
            width={400}
          />
        </div>
      </div>
      <div className="hidden xl:block w-full h-10 bg-film-strip"></div>
    </main>
  );
};

export default HomePage;
