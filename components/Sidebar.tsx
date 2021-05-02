import React, { useContext } from 'react';
import Link from 'next/link';
import {
  Flex,
  Button,
  Stack,
  Checkbox,
} from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';

import FilterContext from '../context/FilterContext';
import shops from '../shops';
import capitalize from '../utils/capitalize';

const Sidebar = () => {
  const { validFilterActive, setValidFilterActive } = useContext(FilterContext);
  return (
    <Flex
      left={0}
      width={{
        base: '100vw', sm: '100vw', md: 250, lg: 250, xl: 250,
      }}
      padding={[4, 6]}
      paddingTop={[3, 0]}
      flexDirection="column"
    >
      <Stack
        direction={{
          base: 'row', sm: 'row', md: 'column', lg: 'column', xl: 'column',
        }}
        spacing={2}
      >
        <Link href="/">
          <Button width={['80%', '100%']} fontSize={[14, 16]}>
            <FiHome />
          </Button>
        </Link>
        {shops.map((shop) => (
          <Link key={shop} href={`/${shop}`}>
            <Button width="100%" fontSize={[14, 16]}>
              {capitalize(shop)}
            </Button>
          </Link>
        ))}
      </Stack>
      <Checkbox
        isChecked={validFilterActive}
        onChange={(event) => setValidFilterActive(event.target.checked)}
        size="md"
        colorScheme="teal"
        marginTop={4}
      >
        Heute verfügbar?
      </Checkbox>
    </Flex>

  );
};

export default Sidebar;
