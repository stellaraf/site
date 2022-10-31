import { chakra } from "@chakra-ui/react";
import { LayoutGroup } from "framer-motion";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { Location } from "./location";
import { useCloudMeasurementValues } from "./use-cloud-measurements";

import type { USMapProps } from "./types";

const Container = chakra("div", { baseStyle: { mx: "auto" } });

export const USMap = (props: USMapProps) => {
  const { geoData, mapColor, markerColor, ...rest } = props;
  const measurements = useCloudMeasurementValues();

  return (
    <Container {...rest}>
      <ComposableMap projection="geoAlbersUsa" style={{ zIndex: 1, position: "relative" }}>
        <Geographies geography={geoData}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={mapColor}
                  style={{
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                    default: { outline: "none" },
                  }}
                />
              ))}
              <LayoutGroup>
                {measurements.map(loc => (
                  <Location key={loc.name} loc={loc} color={markerColor} />
                ))}
              </LayoutGroup>
            </>
          )}
        </Geographies>
      </ComposableMap>
    </Container>
  );
};
