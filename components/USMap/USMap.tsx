import * as React from 'react';
import { forwardRef } from 'react';
import {
  Box,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Portal,
} from '@chakra-ui/core';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { MapMarker } from './Marker';
import type { MapProps } from './types';

export const USMap = forwardRef<HTMLDivElement, MapProps>((props, ref) => {
  const { geoData, locations, mapColor, markerColor, ...rest } = props;
  return (
    <Box ref={ref} mx="auto" {...rest}>
      <ComposableMap projection="geoAlbersUsa" style={{ zIndex: 1, position: 'relative' }}>
        <Geographies geography={geoData}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={mapColor}
                  style={{
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                    default: { outline: 'none' },
                  }}
                />
              ))}
              {locations &&
                locations.map(loc => {
                  if (loc.active) {
                    return (
                      <Popover key={loc.id} trigger="hover" placement="top">
                        <PopoverTrigger>
                          <Link href="#">
                            <MapMarker
                              coordinates={[loc.coordinates.lon, loc.coordinates.lat]}
                              color={markerColor}
                            />
                          </Link>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent zIndex={4} border={0}>
                            <PopoverHeader pt={4} fontWeight="bold" border={0}>
                              {loc.displayName}
                            </PopoverHeader>
                            <PopoverBody>{loc.description}</PopoverBody>
                            <PopoverArrow />
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    );
                  }
                })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </Box>
  );
});
