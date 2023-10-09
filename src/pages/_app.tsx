import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>NextJS Codelab</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
