import { useMemo } from "react";

import {
  Tag,
  Flex,
  HStack,
  Portal,
  Popover,
  PopoverBody,
  PopoverHeader,
  type TagProps,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";

import { MapMarker } from "./map-marker";
import { useBestMeasurement } from "./use-cloud-measurements";

import type { LocationProps, LatencyProps } from "./types";

const Latency = (props: LatencyProps) => {
  const colorScheme = useColorModeValue("secondary", "tertiary");
  const { location } = props;

  const tagProps = useMemo<TagProps>(() => {
    if (location === null || location.elapsed === 65533) {
      return { size: "sm", colorScheme: "red" };
    }
    if (location.elapsed < 65533) {
      return { size: "md", colorScheme };
    }
    if (location.elapsed === 65534) {
      return { size: "sm", colorScheme: "gray" };
    }
    return { opacity: 0 };
  }, [location, colorScheme]);

  const value = useMemo<React.ReactNode>(() => {
    if (location === null) {
      return "UNKNOWN LOCATION";
    }
    if (location.elapsed < 65533) {
      return `${location.elapsed.toFixed(2)} ms`;
    }
    if (location.elapsed === 65533) {
      return "UNREACHABLE";
    }
    if (location.elapsed === 65534) {
      return "INACTIVE";
    }
    return null;
  }, [location]);

  return <Tag {...tagProps}>{value}</Tag>;
};

export const Location = (props: LocationProps) => {
  const { loc, ...rest } = props;
  const { coordinates, name, description } = loc;

  const best = useBestMeasurement();

  return (
    <Popover trigger="hover" placement="top">
      <MapMarker
        best={best?.identifier === loc.identifier}
        coordinates={[coordinates.longitude, coordinates.latitude]}
      />
      <Portal>
        <PopoverContent
          bg="white"
          zIndex={4}
          border={0}
          _dark={{ bg: "blackAlpha.600" }}
          css={{ backdropFilter: "blur(2px)" }}
          {...rest}
        >
          <PopoverHeader pt={4} fontWeight="bold" border={0}>
            <HStack justifyContent="space-between">
              <Flex>{name}</Flex>
              <Latency location={loc} />
            </HStack>
          </PopoverHeader>
          <PopoverBody>{description}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
