import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React Server Component',
};

export default function RSCLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
