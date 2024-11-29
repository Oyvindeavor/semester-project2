import { extendTheme } from '@mui/joy/styles';

const darkTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBg: '#4A90E2',
          solidHoverBg: '#357ABD',
        },
        background: {
          body: '#1F2028',
          level1: '#2C2D36',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B0BEC5',
        },
      },
    },
  },
});

export default darkTheme;
