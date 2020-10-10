import * as React from 'react';
import {
  Box,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/core';
import { VscTriangleDown } from '@meronex/icons/vsc';
import { useColorValue } from 'site/context';
import { MapMarker } from './MapMarker';

import type { LocationProps } from './types';

export const Location = (props: LocationProps) => {
  const { loc, color = 'currentcolor', ...rest } = props;
  const { coordinates, displayName, description } = loc;
  const bg = useColorValue('white', 'blackAlpha.600');
  return (
    <Popover trigger="hover" placement="top">
      <PopoverTrigger>
        <Link>
          <MapMarker coordinates={[coordinates.lon, coordinates.lat]} color={color} />
        </Link>
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg={bg} zIndex={4} border={0} {...rest}>
          <PopoverHeader pt={4} fontWeight="bold" border={0}>
            {displayName}
          </PopoverHeader>
          <PopoverBody>{description}</PopoverBody>
          <PopoverArrow
            bg="transparent"
            css={{
              width: '16px !important',
              height: '16px !important',
              boxShadow: 'none !important',
              transform: 'none !important',
            }}>
            <Box as={VscTriangleDown} display="inline" color={bg} />
          </PopoverArrow>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
