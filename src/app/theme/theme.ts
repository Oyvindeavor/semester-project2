'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2A3447',
    },
    secondary: {
      main: '#64B6AC',
    },
    background: {
      default: '#1A1A1A',
      paper: '#242424',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            fontSize: '90%',
          },
          '@media (min-width:601px) and (max-width:960px)': {
            fontSize: '95%',
          },
          '@media (min-width:961px)': {
            fontSize: '130%',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: 'color 0.2s ease-in-out',
          '&:hover': {
            color: '#64B6AC',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'rotate(90deg)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
});
export default theme;
