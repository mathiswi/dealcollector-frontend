import React, { useState } from 'react';
import {
  Stack,
  Text,
  Image,
  Skeleton,
  Tooltip,
  Flex,
  useColorMode,
} from '@chakra-ui/react';

import capitalize from '../utils/capitalize';

import DescriptionPopover from './DescriptionPopover';

const isValidToday = (validFrom: number) => {
  const currentDay = new Date().getDay();
  return (validFrom ?? 0) <= currentDay;
};

const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

const EmptyLine = () => (
  <>&nbsp;&nbsp;</>
);

const DealCard = ({ deal }: { deal: Deal }) => {
  const [showDescription, setShowDescription] = useState(false);
  const { colorMode } = useColorMode();

  return (
    <Flex
      borderRadius={2}
      border="1px solid"
      borderColor={isValidToday(deal.validFrom) ? 'gray.500' : 'red.600'}
      // padding={3}
      position="relative"
      flexDirection="column"
    >
      <Stack justifyContent="center" height="100px" marginY={2}>
        <Image
          alignSelf="center"
          maxH="100px"
          fallback={<Skeleton alignSelf="center" h="100px" w="140px" />}
          src={deal.imageUrl}
          alt="deal image"
          onClick={() => window.open(deal.detailPage ?? deal.imageUrl, '_blank')}
          cursor="pointer"
        />
      </Stack>

      <Stack spacing="1px" backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.700'} padding={3} flexGrow="1">

        <Tooltip label={deal.name} aria-label="name-tooltip">
          <Text
            fontSize="sm"
            noOfLines={[3, 1]}
            fontWeight={700}
            onClick={() => window.open(deal.detailPage ?? deal.imageUrl, '_blank')}
            cursor="pointer"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            {deal.name}
          </Text>
        </Tooltip>

        <Text fontSize="xs" as="i">
          {deal.unit ?? <EmptyLine />}
        </Text>

        {deal.regularPrice ? (
          <Text fontSize="xs" as="s">
            {deal.regularPrice.toFixed(2)}
            {' '}
            €
          </Text>
        ) : (
          <Text fontSize="xs"><EmptyLine /></Text>
        )}

        <Tooltip label={deal.basePrice} aria-label="name-tooltip">
          <Text fontSize="sm" fontWeight={700} display="inline" noOfLines={[3, 1]}>
            {deal.dealPrice?.toFixed(2)}
            {' '}
            €
            {deal.basePrice && (
              <Text as="i" display="inline">
                {' '}
                (
                {deal.basePrice}
                )
              </Text>
            )}

          </Text>
        </Tooltip>

        <Text fontSize="xs">
          {capitalize(deal.shop)}
          {' '}
          {!isValidToday(deal.validFrom) && (
            `(ab ${weekDays[deal.validFrom - 1]})`
          )}
        </Text>

        <DescriptionPopover
          description={deal.description !== '' ? deal.description : undefined}
          showDescription={showDescription}
          setShowDescription={setShowDescription}
        />

      </Stack>

    </Flex>
  );
};

export default React.memo(DealCard);
