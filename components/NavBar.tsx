import React, { useContext } from 'react';
import {
  Flex, Input, InputGroup, InputLeftElement, useColorMode, Button, Box,
} from '@chakra-ui/react';
import { SearchIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

import SearchContext from '../context/SearchContext';

const NavBar = () => {
  const { query, setQuery } = useContext(SearchContext);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      as="header"
      paddingTop={4}
      paddingBottom={4}
      paddingLeft={[4, 0]}
      paddingRight={[4, 0]}
      position="sticky"
      justifyContent="space-between"
      marginBottom={2}
    >
      <Box display={['none', 'block']} />
      <InputGroup width={['70%', 'unset', 400]}>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value.toLowerCase())}
          background={colorMode === 'dark' && 'gray.700'}
          boxShadow="md"
        />
      </InputGroup>
      <Button onClick={toggleColorMode} alignSelf="flex-end">

        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default NavBar;
