import React, { useState } from 'react';
import {
  Stack,
  Text,
  Image,
  Skeleton,
  Tooltip,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import {
  InfoOutlineIcon,
} from '@chakra-ui/icons';

import capitalize from '../utils/capitalize';

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

  return (
    <Stack
      borderRadius={4}
      border="1px solid"
      borderColor={isValidToday(deal.validFrom) ? 'gray.600' : 'red.600'}
      padding={3}
      position="relative"
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
          {deal.unit ?? <EmptyLine />}
        </Text>
        <Text fontSize="xs" as="i" />
        {deal.regularPrice ? (
          <Text fontSize="xs" as="s">
            {deal.regularPrice}
            {' '}
            €
          </Text>
        ) : (
          <Text fontSize="xs"><EmptyLine /></Text>
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
        <Popover
          isOpen={showDescription}
          onClose={() => setShowDescription(false)}
        >
          <PopoverTrigger>
            <IconButton
              variant="ghost"
              size="sm"
              colorScheme="teal"
              aria-label="Call Sage"
              position="absolute"
              bottom={1}
              right={1}
              icon={<InfoOutlineIcon />}
              onClick={() => setShowDescription(!showDescription)}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Beschreibung</PopoverHeader>
            <PopoverBody>{deal.description === '' ? '-' : deal.description}</PopoverBody>
          </PopoverContent>
        </Popover>

      </Stack>

    </Stack>
  );
};

export default DealCard;
