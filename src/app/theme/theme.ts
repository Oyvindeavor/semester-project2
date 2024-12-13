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
    background: {
      default: '#2A3447',
      paper: '#344054',
    },
    primary: {
      main: '#406FB6',
      light: '#7FB1FA',
      dark: '#4785E5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#416FB6',
      light: '#60CAFA',
      dark: '#0EA5E9',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B4C0D3',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    error: {
      main: '#FF5766',
      light: '#FF7A86',
      dark: '#E63E4D',
    },
    warning: {
      main: '#FFA83F',
      light: '#FFB95F',
      dark: '#F59300',
    },
    success: {
      main: '#2DD4BF',
      light: '#4FDBCA',
      dark: '#14B8A6',
    },
  },
  typography: {
    fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#B4C0D3',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#B4C0D3',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#B4C0D3',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#B4C0D3',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      color: '#B4C0D3',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      color: 'text.primary',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          color: '#FFFFFF',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
          },
        },
        outlined: {
          color: '#5B9AF9',
          borderColor: 'rgba(255, 255, 255, 0.16)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#344054',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#344054',
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#344054',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#5B9AF9',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.16)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#344054',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#344054',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(91, 154, 249, 0.08)',
          },
        },
      },
    },
  },
});

export default theme;
