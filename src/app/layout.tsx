import * as React from 'react';
import NavBar from '@/components/navbar/navbar';
import './globals.scss';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '@/theme';
import { Roboto } from 'next/font/google';
import { CssBaseline, Grid, Container } from '@mui/material';
import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';

import Footer from '@/components/footer/footer';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: 'My Joy UI App',
  description: 'A Next.js app with Joy UI',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SessionProvider session={session}>
            {/* <ThemeProvider theme={theme}> */}
            <CssBaseline />
            <Grid
              container
              direction="column"
              sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
              }}
            >
              {/* Header */}
              <Grid item component="header">
                <NavBar />
              </Grid>

              {/* Main Content */}
              <Grid item xs>
                <Container
                  maxWidth="lg"
                  sx={{
                    mt: 4,
                    mb: 4,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {props.children}
                </Container>
              </Grid>

              {/* Footer */}

              <Footer />
            </Grid>

            {/* </ThemeProvider> */}
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
