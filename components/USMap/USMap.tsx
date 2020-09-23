import * as React from 'react';
import { Box } from '@chakra-ui/core';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Location } from './Location';

import type { MapProps } from './types';

export const USMap = (props: MapProps) => {
  const { geoData, locations, mapColor, markerColor, ...rest } = props;
  return (
    <Box mx="auto" {...rest}>
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
                locations.map(
                  loc =>
                    loc.active && <Location key={loc.displayName} loc={loc} color={markerColor} />,
                )}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </Box>
  );
};
