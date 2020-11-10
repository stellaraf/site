import { useMemo } from 'react';
import {
  Flex,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  Portal,
  Tag,
} from '@chakra-ui/core';
import { useState } from '@hookstate/core';
import { useColorValue } from 'site/context';
import { If } from 'site/components';
import { MapMarker } from './MapMarker';
import { useCloudLocations } from 'site/state';

import type { State } from '@hookstate/core';
import type { ITestResults, ITestLocation } from 'site/types';
import type { LocationProps, ILatency } from './types';

function currentLocation(locations: State<ITestResults>, locId: string): State<ITestLocation> {
  return locations.filter(loc => loc.id.value === locId)[0];
}

const Latency = (props: ILatency) => {
  const colorScheme = useColorValue('secondary', 'tertiary');
  const { locState } = props;
  return (
    <>
      <If condition={locState.elapsed.value < 65533}>
        <Tag size="sm" colorScheme={colorScheme}>{`${locState.elapsed.value.toFixed(2)} ms`}</Tag>
      </If>
      <If condition={locState.elapsed.value === 65533}>
        <Tag size="sm" colorScheme="red">
          UNREACHABLE
        </Tag>
      </If>
      <If condition={locState.elapsed.value === 65534}>
        <Tag size="sm" colorScheme="gray">
          INACTIVE
        </Tag>
      </If>
    </>
  );
};

export const Location = (props: LocationProps) => {
  const { loc, color = 'currentcolor', ...rest } = props;
  const { coordinates, displayName, description } = loc;
  const bg = useColorValue('white', 'blackAlpha.600');
  const testsState = useCloudLocations();
  const tests = useState(testsState);
  const locState = useMemo(() => currentLocation(tests, loc.id), [loc.id]);
  const isBest = () =>
    tests.filter(test => test.id.value === loc.id && test.best.value === true).length !== 0;

  return (
    <Popover trigger="hover" placement="top">
      <MapMarker coordinates={[coordinates.lon, coordinates.lat]} color={color} best={isBest()} />
      <Portal>
        <PopoverContent
          bg={bg}
          zIndex={4}
          border={0}
          css={{ backdropFilter: 'blur(2px)' }}
          {...rest}>
          <PopoverHeader pt={4} fontWeight="bold" border={0}>
            <HStack justifyContent="space-between">
              <Flex>{displayName}</Flex>
              <Latency locState={locState} />
            </HStack>
          </PopoverHeader>
          <PopoverBody>{description}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
