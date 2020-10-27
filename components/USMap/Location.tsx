import { useMemo } from 'react';
import {
  Box,
  Flex,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Tag,
  HStack,
} from '@chakra-ui/core';
import { VscTriangleDown } from '@meronex/icons/vsc';
import { useColorValue } from 'site/context';
import { If } from 'site/components';
import { MapMarker } from './MapMarker';
import { useCloudLocations } from 'site/state';

import type { State } from '@hookstate/core';
import type { ITestResult, LocationProps, ILatency, ITestLocation } from './types';

function currentLocation(locations: State<ITestResult>, locId: string): State<ITestLocation> {
  return locations.filter(loc => loc.id.value === locId)[0];
}

const Latency = (props: ILatency) => {
  const colorScheme = useColorValue('secondary', 'tertiary');
  return (
    <If condition={props.elapsed !== 65535}>
      <Tag size="sm" colorScheme={colorScheme}>{`${props.elapsed.toFixed(2)} ms`}</Tag>
    </If>
  );
};

export const Location = (props: LocationProps) => {
  const { loc, color = 'currentcolor', ...rest } = props;
  const { coordinates, displayName, description } = loc;
  const bg = useColorValue('white', 'blackAlpha.600');
  const tests = useCloudLocations();
  const locState = useMemo(() => currentLocation(tests, loc.id), [loc.id]);
  const isBest = () =>
    tests.filter(test => test.id.value === loc.id && test.best.value === true).length !== 0;
  return (
    <Popover trigger="hover" placement="top">
      <PopoverTrigger>
        <Link>
          <MapMarker
            coordinates={[coordinates.lon, coordinates.lat]}
            color={color}
            best={isBest()}
          />
        </Link>
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg={bg} zIndex={4} border={0} {...rest}>
          <PopoverHeader pt={4} fontWeight="bold" border={0}>
            <HStack justifyContent="space-between">
              <Flex>{displayName}</Flex>
              <Latency elapsed={locState.elapsed.value} />
            </HStack>
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
