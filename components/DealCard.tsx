import React from 'react';
import {
  Stack, Text, Image, Skeleton,
} from '@chakra-ui/react';

const isValidToday = (validFrom: number) => {
  const currentDay = new Date().getDay();
  return (validFrom ?? 0) <= currentDay;
};

const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

const DealCard = ({ deal } : { deal: Deal }) => (
  <Stack
    borderRadius={6}
    border="1px solid"
    borderColor={isValidToday(deal.validFrom) ? 'gray.600' : 'red.600'}
    // height="200px"
    padding={3}
  >
    <Stack justifyContent="center" height="100px">

      <Image
        alignSelf="center"
        maxH="100px"
      // objectFit="cover"
        fallback={<Skeleton alignSelf="center" h="100px" w="140px" />}
        src={deal.imageUrl}
        alt="deal image"
        onClick={() => window.open(deal.imageUrl, '_blank')}
      />
    </Stack>
    <Stack spacing="1px">
      <Text fontSize="xs" noOfLines={[3, 1]}>
        {deal.name}
      </Text>
      <Text fontSize="xs" as="i">
        {deal.unit}
      </Text>
      <Text fontSize="xs">
        {deal.dealPrice}
        {' '}
        €
      </Text>
      <Text fontSize="xs" casing="capitalize">
        {deal.shop}
        {' '}
        {!isValidToday(deal.validFrom) && (
          `(gültig ab ${weekDays[deal.validFrom - 1]})`
        )}

      </Text>
    </Stack>

  </Stack>
);

export default DealCard;
