import * as React from 'react';
import { forwardRef, MutableRefObject } from 'react';
import {
  Box,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/core';
import { useSpring, animated } from 'react-spring';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useColorMode } from '../context';
import { GeoPoint } from '../util';

type Ref = MutableRefObject<HTMLElement>;

interface MarkerProps {
  color: string;
  [k: string]: any;
}

interface MapProps {
  geoData: object;
  locations: GeoPoint[];
  mapColor: string;
  markerColor: string;
  [k: string]: any;
}

const Circle = props => <Box as="circle" {...props} />;

const MapMarker = forwardRef(({ color = 'currentColor', ...props }: MarkerProps, ref: Ref) => {
  const { colorMode } = useColorMode();
  const animation = useSpring({
    to: async next => {
      while (1) {
        await next({ opacity: 0.2, transform: 'scale(1)' });
        await next({ opacity: 0, transform: 'scale(4)' });
        await next({ opacity: 0, transform: 'scale(1)' });
      }
    },
    config: { duration: 1000 },
  });
  return (
    <Marker {...props}>
      <Circle
        ref={ref}
        r={4}
        fill={color}
        stroke="white"
        boxShadow="sm"
        strokeWidth={1.5}
        zIndex={2}
      />
      <animated.circle r={4} fill={colorMode === 'light' ? 'black' : 'white'} style={animation} />
    </Marker>
  );
});

export const USMap = forwardRef(
  ({ geoData, locations, mapColor, markerColor, ...props }: MapProps, ref: Ref) => {
    return (
      <Box ref={ref} mx="auto" {...props}>
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
                        <Popover key={loc.id} trigger="hover" placement="top" usePortal>
                          <PopoverTrigger>
                            <Link href="#">
                              <MapMarker
                                coordinates={[loc.coordinates.lon, loc.coordinates.lat]}
                                color={markerColor}
                              />
                            </Link>
                          </PopoverTrigger>
                          <PopoverContent zIndex={4} border={0}>
                            <PopoverHeader pt={4} fontWeight="bold" border={0}>
                              {loc.displayName}
                            </PopoverHeader>
                            <PopoverBody>{loc.description}</PopoverBody>
                            <PopoverArrow />
                          </PopoverContent>
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
  },
);
