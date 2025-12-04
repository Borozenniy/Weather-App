import type { Metadata } from 'next';
import { Header } from '@/components/header/header';
import { ThemeProvider } from '@/providers/theme-provider/theme-context';
import { ReduxProvider } from '@/providers/redux-provider/redux-provider';
import { ModalProvider } from '@/providers/modal-provider/modal-provider';
import { Geist, Geist_Mono, Noto_Sans } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSans = Noto_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s - Weatherly',
    default: 'Weatherly',
  },
  description:
    'Done as a per project. Weatherly is a weather app that allows you to see the weather in your city.',
  icons: {
    icon: '/icons/sun.png',
    shortcut: '/icons/sun.png',
    apple: '/icons/sun.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} antialiased`}
      >
        <ThemeProvider>
          <ReduxProvider>
            <ModalProvider>
              <Header />
              {children}
            </ModalProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
