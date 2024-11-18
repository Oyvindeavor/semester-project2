import extendTheme from '@mui/joy/styles/extendTheme';
import colors from '@theme/colors';
import typography from '@theme/typography';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: colors.light,
    },
    dark: {
      palette: colors.dark,
    },
  },
  typography: typography,
});
export const clientTheme = theme.vars;
export default theme;
