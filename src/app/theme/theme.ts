'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3D84E6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E91E63',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#A8A8A8',
    },
    error: {
      main: '#FF5252',
    },
    success: {
      main: '#4CAF50',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    // Let MUI handle responsive font sizes for all variants
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            // Use a shadow based on the primary color for a modern "glow" effect
            boxShadow: '0 8px 25px 0 rgba(61, 132, 230, 0.3)',
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
          color: '#3D84E6', // Use primary color for links
          transition: 'color 0.2s ease-in-out',
          '&:hover': {
            // Hover with the vibrant secondary color for consistency
            color: '#E91E63',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'rotate(90deg) scale(1.05)', // Added a subtle scale for more pop
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

// This function makes all typography variants (h1, h2, body1, etc.) responsive
theme = responsiveFontSizes(theme);

export default theme;
