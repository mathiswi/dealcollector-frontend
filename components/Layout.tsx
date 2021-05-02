import { Container, Flex } from '@chakra-ui/react';
import React from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <Container
    maxW="container.xl"
    padding={{
      base: 0,
    }}
  >
    <NavBar />
    <Flex
      flexDirection={{
        base: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row',
      }}
    >
      <Sidebar />
      <Container maxW="unset">
        {children}
      </Container>
    </Flex>
  </Container>
);

export default Layout;
