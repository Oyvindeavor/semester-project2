import * as React from 'react';
import NavBar from '@/components/navbar/navbar';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '@/theme';
import { Roboto } from 'next/font/google';
import { CssBaseline, Container, ThemeProvider } from '@mui/material';
import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import Box from '@mui/material/Box';
import theme from '@/app/theme/theme';
import Footer from '@/components/footer/footer';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: 'Peregrine Auctions',
  description: 'Discover new auctions and bid on your favorite items.',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SessionProvider session={session}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <ThemeProvider theme={theme}>
                <CssBaseline />

                {/* Header */}

                <NavBar />

                {/* Main Content */}

                <Container
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
              </ThemeProvider>
            </Box>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
