import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rendu front, action !',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-light h-screen`}>
        <Header />
        <div className="sm:pt-20 pt-28 pb-12 h-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
