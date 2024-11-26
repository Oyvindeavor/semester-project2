import { BorderAllSharp, BorderBottomTwoTone } from '@mui/icons-material';
import { extendTheme } from '@mui/joy/styles';
import { transform } from 'next/dist/build/swc/generated-native';
import { Inter, Source_Code_Pro } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: ['var(--joy-fontFamily-fallback)'], // use Joy UI's fallback font
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: [
    // the default theme's fallback for monospace fonts
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
  display: 'swap',
});

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#4A90E2', // Complementary blue
          solidHoverBg: '#357ABD', // Darker blue for hover
          solidActiveBg: '#2A5E91', // Even darker blue for active state
          solidDisabledBg: '#F3F3F3', // Light gray for disabled
          solidDisabledColor: '#A19F9D', // Muted gray for disabled text
          outlinedBg: '#FFFFFF', // White background for outlined buttons
        },
        background: {
          body: '#1F2028', // Base background color
          level1: '#FFFFFF', // Default container background
          level2: '#2C2D36', // Slightly elevated background
          level3: '#3A3B44', // Further elevated background
        },
        neutral: {
          outlinedBg: '#29271F', // Warm dark background for outlined elements
          outlinedColor: '#D1D2D8', // Light gray outline color
          outlinedDisabledBg: '#1F2028', // Same as body for disabled background
          outlinedDisabledColor: '#5A5B60', // Muted gray for disabled text
          outlinedDisabledBorder: '#8A8886', // Subtle gray border
          outlinedBorder: '#4A4B52', // Neutral gray for outlines
          outlinedHoverBg: '#2C2D36', // Subtle hover effect
          outlinedActiveBg: '#3A3B44', // Slightly elevated active state
        },
        text: {
          primary: '#FFFFFF', // White for high contrast against dark background
          secondary: '#B0BEC5', // Muted light gray for secondary text
        },
        focusVisible: '#4A90E2', // Complementary blue for focus outlines
      },
    },
  },
  focus: {
    default: {
      outlineOffset: -1,
      outlineWidth: '2px',
      outlineColor: '#4A90E2', // Blue for focus states
    },
  },
  fontFamily: {
    body: '"Segoe UI Variable", var(--fluent-fontFamily-fallback)', // Clean sans-serif font
    display: '"Segoe UI Variable", sans-serif', // For headings
    code: '"Source Code Pro", monospace', // For code and monospace text
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '--Button-iconOffsetStep': 0,
          color: '#FFFFFF', // Ensure button text is visible on dark background
          ...(ownerState.variant === 'solid' && {
            backgroundColor: '#4A90E2', // Primary button background
            '&:hover': {
              backgroundColor: '#357ABD', // Hover state
            },
            '&:active': {
              backgroundColor: '#2A5E91', // Active state
            },
            '&:disabled': {
              backgroundColor: '#F3F3F3', // Disabled state
              color: '#A19F9D', // Disabled text
            },
          }),
          ...(ownerState.variant === 'outlined' && {
            borderColor: '#4A90E2', // Primary color for outlined border
            color: '#4A90E2', // Text color matches the border
            '&:hover': {
              backgroundColor: '#2C2D36', // Subtle hover background
            },
            '&:active': {
              backgroundColor: '#3A3B44', // Slightly elevated active state
            },
          }),
          ...(ownerState.size === 'md' && {
            '--Icon-fontSize': '20px',
            fontSize: '14px',
            fontWeight: 600,
            minHeight: '32px',
            borderRadius: '6px',
            paddingLeft: 20,
            paddingRight: 20,
          }),
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // White text in input fields
          backgroundColor: '#29271F', // Input background
          borderRadius: '4px',
          borderColor: '#4A90E2', // Input border
          '&:hover': {
            borderColor: '#357ABD', // Hover state
          },
          '&:focus-within': {
            borderColor: '#4A90E2', // Focus state
          },
          '&:disabled': {
            backgroundColor: '#1F2028', // Disabled input background
            color: '#5A5B60', // Disabled text
          },
        },
      },
    },
    JoyCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2C2D36', // Dark card background
          color: '#FFFFFF', // White text for cards
          borderRadius: '10px',
          padding: '16px',
          '&:hover': {
            transformScale: 1.1, // Slightly larger on hover
          },
        },
      },
    },
    JoyTypography: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // White text by default
          '&.MuiTypography-h1': {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#4A90E2', // Blue for headings
          },
          '&.MuiTypography-body1': {
            fontSize: '1rem',
            color: '#B0BEC5', // Muted gray for body text
          },
        },
      },
    },
    JoySheet: {
      styleOverrides: {
        root: {
          backgroundColor: '#2C2D36', // Dark sheet background
          color: '#FFFFFF', // White text for sheets
          borderRadius: '10px',
          padding: '16px',
        },
      },
    },
  },
});

export default theme;
