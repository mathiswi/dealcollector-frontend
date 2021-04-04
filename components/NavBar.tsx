import React, { useContext } from 'react';
import {
  Flex, HStack, Link, Input, InputGroup, InputLeftElement, Stack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { SearchIcon } from '@chakra-ui/icons';

import { useRouter } from 'next/router';
import capitalize from '../utils/capitalize';
import SearchContext from '../context/SearchContext';

import shops from '../shops';

const NavBar = () => {
  const { asPath } = useRouter();
  const { filter, setFilter } = useContext(SearchContext);

  return (
    <Flex
      as="nav"
      borderBottom="1px"
      padding={4}
      paddingLeft={10}
      position="sticky"
    >

      <HStack spacing={16}>
        <NextLink href="/" passHref>
          <Link href="/" boxShadow="none" color={asPath === '/' && 'blue.300'}>Home</Link>
        </NextLink>
        {shops.map((shop) => (
          <NextLink href={`${shop}`} passHref key={shop}>
            <Link href={`${shop}`} boxShadow="none" color={shop === asPath.split('/')[1] && 'blue.300'}>{capitalize(shop)}</Link>
          </NextLink>
        ))}
        <Stack>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              value={filter}
              onChange={(event) => setFilter(event.target.value.toLowerCase())}
            />
          </InputGroup>
        </Stack>
      </HStack>
    </Flex>
  );
};

export default NavBar;
