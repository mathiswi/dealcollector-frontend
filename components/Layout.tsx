import { Container, Flex } from '@chakra-ui/react';
import React from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <Container maxW="container.xl" padding={0}>
    <NavBar />
    <Flex
      flexDirection={['column', 'row']}
      alignItems={['center', 'flex-start']}
    >
      <Sidebar />
      <Container maxW="unset" paddingRight={[4, 0]}>
        {children}
      </Container>
    </Flex>
  </Container>
);

export default Layout;
