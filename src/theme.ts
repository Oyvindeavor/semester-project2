'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto', // This will be used in CSS
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d87f17',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#1F2028',
      paper: '#46485a',
    },
    warning: {
      main: '#e03e0c',
    },
    divider: '#d87f17',
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: roboto.variable, // Use the Roboto font variable here
    h1: {
      fontSize: '2.25rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
});

export default theme;
