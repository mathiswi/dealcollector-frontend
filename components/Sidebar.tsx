import React from 'react';
import Link from 'next/link';
import {
  Flex,
  Button,
  Stack,
} from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';

const Sidebar = () => (
  <Flex
    left={0}
    width={['95vw', '200px']}
    padding={[4, 8]}
    flexDirection="column"
  >
    <Stack direction={['row', 'column']}>
      <Link href="/">
        <Button width="100%">
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

    </Stack>
  </Flex>
);

export default Sidebar;
