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

const Sidebar = () => {
  const { validFilterActive, setValidFilterActive } = useContext(FilterContext);
  return (
    <Flex
      left={0}
      width={['100vw', '250px']}
      padding={[4, 6]}
      paddingTop={[3, 0]}
      flexDirection="column"
    >
      <Stack direction={['row', 'column']}>
        <Link href="/">
          <Button width={['80%', '100%']}>
            <FiHome />
          </Button>
        </Link>

        <Link href="/famila">
          <Button width="100%">
            Famila
          </Button>
        </Link>
        <Link href="/lidl">
          <Button width="100%">
            Lidl
          </Button>
        </Link>
        <Link href="/aldi">
          <Button width="100%">
            Aldi
          </Button>
        </Link>
        <Link href="/edeka">
          <Button width="100%">
            Edeka
          </Button>
        </Link>
        <Checkbox
          isChecked={validFilterActive}
          onChange={(event) => setValidFilterActive(event.target.checked)}
          size="md"
          colorScheme="green"
        >
          Heute verfügbar?
        </Checkbox>
      </Stack>
    </Flex>

  );
};

export default Sidebar;
