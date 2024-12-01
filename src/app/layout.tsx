import * as React from 'react';
import NavBar from '@/components/navbar/navbar';
import { AuthProvider } from '@/context';
import './globals.scss';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { Roboto } from 'next/font/google';
import { CssBaseline } from '@mui/material';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

// import custom components navbar etc here
export const metadata = {
  title: 'My Joy UI App',
  description: 'A Next.js app with Joy UI',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              <NavBar />
              {props.children}
            </ThemeProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
