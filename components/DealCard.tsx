import React from 'react';
import {
  Stack, Text, Image, Skeleton, Tooltip,
} from '@chakra-ui/react';

import capitalize from '../utils/capitalize';

const isValidToday = (validFrom: number) => {
  const currentDay = new Date().getDay();
  return (validFrom ?? 0) <= currentDay;
};

const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

const DealCard = ({ deal }: { deal: Deal }) => (
  <Stack
    borderRadius={6}
    border="1px solid"
    borderColor={isValidToday(deal.validFrom) ? 'gray.600' : 'red.600'}
    padding={3}
  >
    <Stack justifyContent="center" height="100px">
      <Image
        alignSelf="center"
        maxH="100px"
        fallback={<Skeleton alignSelf="center" h="100px" w="140px" />}
        src={deal.imageUrl}
        alt="deal image"
        onClick={() => window.open(deal.imageUrl, '_blank')}
      />
    </Stack>
    <Stack spacing="1px">
      <Tooltip label={deal.name} aria-label="name-tooltip">
        <Text fontSize="sm" noOfLines={[3, 1]} fontWeight={700}>
          {deal.name}
        </Text>
      </Tooltip>
      <Text fontSize="xs" as="i">
        {deal.unit ?? <>&nbsp;&nbsp;</>}
      </Text>
      <Text fontSize="xs" as="i" />
      {deal.regularPrice ? (
        <Text fontSize="xs" as="s">
          {deal.regularPrice}
          {' '}
          €
        </Text>
      ) : (
        <Text fontSize="xs">&nbsp;&nbsp;</Text>
      )}
      <Tooltip label={deal.basePrice} aria-label="name-tooltip">
        <Text fontSize="sm" fontWeight={700} display="inline" noOfLines={[3, 1]}>
          {deal.dealPrice}
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
    </Stack>

  </Stack>
);

export default DealCard;
