import * as React from 'react';
import NavBar from '@/components/navbar/navbar';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Inter } from 'next/font/google';

import { CssBaseline, Container, ThemeProvider } from '@mui/material';
import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import Box from '@mui/material/Box';
import theme from '@/app/theme/theme';
import Footer from '@/components/footer/footer';
import { Viewport } from 'next';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Peregrine Auctions',
  description: 'Discover new auctions and bid on your favorite items.',
  manifest: '/manifest.json',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                }}
                role="presentation"
              >
                {/* Header landmark */}
                <header role="banner">
                  <NavBar />
                </header>

                {/* Main content landmark */}
                <Container
                  component="main"
                  role="main"
                  maxWidth="lg"
                  sx={{
                    mt: 6,
                    mb: 10,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {props.children}
                </Container>

                {/* Footer */}

                <Footer />
              </Box>
            </ThemeProvider>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
