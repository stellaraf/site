import * as React from 'react';
import {
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/core';
import { MapMarker } from './MapMarker';

import type { LocationProps } from './types';

export const Location = (props: LocationProps) => {
  const { loc, color = 'currentcolor', ...rest } = props;
  const { coordinates, displayName, description } = loc;
  return (
    <Popover trigger="hover" placement="top">
      <PopoverTrigger>
        <Link href="#">
          <MapMarker coordinates={[coordinates.lon, coordinates.lat]} color={color} />
        </Link>
      </PopoverTrigger>
      <Portal>
        <PopoverContent zIndex={4} border={0} {...rest}>
          <PopoverHeader pt={4} fontWeight="bold" border={0}>
            {displayName}
          </PopoverHeader>
          <PopoverBody>{description}</PopoverBody>
          <PopoverArrow />
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
