import { Container, Flex, Box } from '@chakra-ui/react';
import React from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <Container maxW="container.xl" padding={0} display="flex" flexDirection="column" height="100vh">
    <NavBar />
    <Flex
      flexDirection={['column', 'row']}
      alignItems={['center', 'flex-start']}
      flex="1 1 auto"
    >
      <Sidebar />
      <Box maxW="unset" height="100%" width="95%" flex="1 1 auto">
        {children}
      </Box>
    </Flex>
  </Container>
);

export default Layout;
