import React, { useContext } from 'react';
import {
  Flex, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import SearchContext from '../context/SearchContext';

const NavBar = () => {
  const { filter, setFilter } = useContext(SearchContext);

  return (
    <Flex
      as="header"
      // borderppBottom="1px"
      padding={4}
      position="sticky"
      justifyContent="center"
    >
      <InputGroup width={400}>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          value={filter}
          onChange={(event) => setFilter(event.target.value.toLowerCase())}
        />
      </InputGroup>
    </Flex>
  );
};

export default NavBar;
