import { chakra } from "@chakra-ui/react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { LayoutGroup } from "framer-motion";
import { useCloudMeasurementValues } from "~/hooks";
import { Location } from "./Location";

import type { IUSMap } from "./types";

const Container = chakra("div", { baseStyle: { mx: "auto" } });

export const USMap = (props: IUSMap): JSX.Element => {
  const { geoData, mapColor, markerColor, ...rest } = props;
  const measurements = useCloudMeasurementValues();
  console.log(measurements.filter(m => m.active).map(m => [m.id, m.elapsed, m.done, m.best]));
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
                  <Location key={loc.displayName} loc={loc} color={markerColor} />
                ))}
              </LayoutGroup>
            </>
          )}
        </Geographies>
      </ComposableMap>
    </Container>
  );
};
