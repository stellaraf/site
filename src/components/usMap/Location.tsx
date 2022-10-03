import {
  Tag,
  Flex,
  HStack,
  Portal,
  Popover,
  PopoverBody,
  PopoverHeader,
  PopoverContent,
} from '@chakra-ui/react';
import { If } from '~/components';
import { useColorValue } from '~/context';
import { MapMarker } from './MapMarker';

import type { LocationProps, ILatency } from './types';

const Latency = (props: ILatency): JSX.Element => {
  const colorScheme = useColorValue('secondary', 'tertiary');
  const { location } = props;
  if (location === null) {
    return (
      <Tag size="sm" colorScheme="red">
        UNKNOWN LOCATION
      </Tag>
    );
  }
  return (
    <>
      <If condition={location.elapsed < 65533}>
        <Tag size="sm" colorScheme={colorScheme}>{`${location.elapsed.toFixed(2)} ms`}</Tag>
      </If>
      <If condition={location.elapsed === 65533}>
        <Tag size="sm" colorScheme="red">
          UNREACHABLE
        </Tag>
      </If>
      <If condition={location.elapsed === 65534}>
        <Tag size="sm" colorScheme="gray">
          INACTIVE
        </Tag>
      </If>
    </>
  );
};

export const Location = (props: LocationProps): JSX.Element => {
  const { loc, color = 'currentcolor', ...rest } = props;
  const { coordinates, displayName, description } = loc;

  const bg = useColorValue('white', 'blackAlpha.600');

  return (
    <Popover trigger="hover" placement="top">
      <MapMarker coordinates={[coordinates.lon, coordinates.lat]} color={color} best={loc.best} />
      <Portal>
        <PopoverContent
          bg={bg}
          zIndex={4}
          border={0}
          css={{ backdropFilter: 'blur(2px)' }}
          {...rest}
        >
          <PopoverHeader pt={4} fontWeight="bold" border={0}>
            <HStack justifyContent="space-between">
              <Flex>{displayName}</Flex>
              <Latency location={loc} />
            </HStack>
          </PopoverHeader>
          <PopoverBody>{description}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
