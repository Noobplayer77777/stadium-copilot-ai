import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Stadium Copilot AI',
    default: 'Stadium Copilot AI',
  },
  description:
    'AI-powered operational intelligence platform for FIFA World Cup 2026. Powering navigation, crowd management, and real-time decision support.',
  keywords: ['FIFA', 'World Cup 2026', 'Stadium', 'AI', 'Crowd Management', 'Navigation'],
  authors: [{ name: 'Stadium Copilot AI Team' }],
  openGraph: {
    type: 'website',
    title: 'Stadium Copilot AI',
    description: 'AI-powered stadium operations platform for FIFA World Cup 2026',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFF' },
    { media: '(prefers-color-scheme: dark)', color: '#080C16' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
