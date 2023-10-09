import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="fr">
      <Head />
      <body className="bg-gray-light">
        <Header />
        <div className="sm:mt-20 mt-28 mb-10">
          <Main />
        </div>
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
