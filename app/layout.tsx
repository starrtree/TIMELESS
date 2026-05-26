import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TIMELESS No Limit',
  description: 'A lifestyle movement blending fitness, spirituality, creativity, events, and community.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
