import { Box } from '@chakra-ui/core';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { AnimateSharedLayout } from 'framer-motion';
import { Location } from './Location';

import type { IUSMap } from './types';

export const USMap = (props: IUSMap) => {
  const { geoData, mapColor, markerColor, locations, ...rest } = props;
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
              {locations && (
                <AnimateSharedLayout>
                  {locations.map(loc => (
                    <Location key={loc.displayName} loc={loc} color={markerColor} />
                  ))}
                </AnimateSharedLayout>
              )}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </Box>
  );
};
