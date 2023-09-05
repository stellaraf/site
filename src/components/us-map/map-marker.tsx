import {
  Link,
  chakra,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Marker } from "react-simple-maps";

import { useColorTokenValue } from "~/hooks";

import type { MapMarkerProps } from "./types";
import type { Variants } from "framer-motion";

const bestVariants = {
  best: {
    opacity: 1,
    scale: 3,
    display: "block",
  },
  notBest: { opacity: 0, scale: 15, display: "none" },
} as Variants;

export const MapMarker = (props: MapMarkerProps) => {
  const { best = false, ...rest } = props;

  const bestOutline = useColorTokenValue("secondary.500", "tertiary.500");
  const fill = useColorModeValue("black", "white");
  const size = useBreakpointValue({ base: 12, md: 8, lg: 5 });
  const stroke = useBreakpointValue({ base: 2, lg: 1 });

  return (
    <PopoverTrigger>
      <Link>
        <Marker {...rest}>
          <motion.circle
            r={size}
            initial="notBest"
            fill="transparent"
            strokeWidth={0.25}
            stroke={bestOutline}
            variants={bestVariants}
            style={{ position: "absolute" }}
            animate={best ? "best" : "notBest"}
            className="__map-point-best-outline"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <chakra.circle
            r={size}
            stroke="white"
            boxShadow="sm"
            strokeWidth={stroke}
            className="__map-point"
            fill={best ? "tertiary.500" : "primary.400"}
            _dark={{ fill: best ? "red.300" : "tertiary.600" }}
          />
          <motion.circle
            r={size}
            fill={fill}
            className="__map-point-ping"
            animate={{ scale: [1, 4], opacity: [0.2, 0] }}
            style={{ position: "absolute", userSelect: "none" }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
          />
        </Marker>
      </Link>
    </PopoverTrigger>
  );
};
