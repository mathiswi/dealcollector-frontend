import { Container, Flex, Box } from '@chakra-ui/react';
import React from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <Box>
    <NavBar />
    <Flex
      flexDirection={['column', 'row']}
      alignItems={['center', 'flex-start']}
    >
      <Sidebar />
      <Container maxW={['95vw', '80vw']} paddingTop={8}>
        {children}
      </Container>
    </Flex>
  </Box>
);

export default Layout;
