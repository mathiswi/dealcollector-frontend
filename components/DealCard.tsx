import React from 'react';
import {
  Stack, Text, Image, Skeleton,
} from '@chakra-ui/react';

const DealCard = ({ deal } : { deal: Deal }) => {
  const validFrom = deal.validFrom ?? 0;
  const currentDay = new Date().getDay();
  return (
    <Stack
      borderRadius={6}
      border="1px solid"
      borderColor={validFrom <= currentDay ? 'gray.600' : 'red.600'}
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
        />
      </Stack>
      <Stack spacing="1px">
        <Text fontSize="xs" noOfLines={1}>
          {deal.name}
        </Text>
        <Text fontSize="xs">
          {deal.dealPrice}
          {' '}
          €
        </Text>
        <Text fontSize="xs">
          {deal.shop}
        </Text>
      </Stack>

    </Stack>
  );
};

export default DealCard;
