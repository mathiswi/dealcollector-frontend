import React, { SetStateAction, Dispatch } from 'react';
import {
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

interface DescriptionPopoverProps {
  showDescription: boolean
  setShowDescription: Dispatch<SetStateAction<boolean>>
  description: string | undefined
}

const DescriptionPopover = (
  { showDescription, setShowDescription, description }: DescriptionPopoverProps,
) => (

  <Popover
    isOpen={showDescription}
    onClose={() => setShowDescription(false)}
    isLazy
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
      <PopoverBody>{description ?? '_'}</PopoverBody>
    </PopoverContent>
  </Popover>

);

export default DescriptionPopover;
