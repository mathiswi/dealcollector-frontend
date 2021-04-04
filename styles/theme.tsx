import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  shadows: {
    outline: 'none',
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
});
export default theme;
