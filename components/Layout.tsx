import { Box } from '@chakra-ui/react';
import React from 'react';
import NavBar from './NavBar';

const Layout = ({ children }) => (
  <>
    <NavBar />
    <Box padding={8}>
      {children}
    </Box>
  </>
);

export default Layout;
