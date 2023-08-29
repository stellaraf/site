import { Box, Link, PopoverTrigger, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Marker } from "react-simple-maps";

import { useColorTokenValue } from "~/context";

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
  const { color = "currentColor", best = false, ...rest } = props;

  const bestOutline = useColorTokenValue("secondary.500", "tertiary.500");
  const fill = useColorModeValue("black", "white");
  const radius = useBreakpointValue({ base: 12, lg: 4 });
  const bestColor = useColorModeValue("tertiary.500", "red.500");

  return (
    <PopoverTrigger>
      <Link>
        <Marker {...rest}>
          <motion.circle
            r={radius}
            initial="notBest"
            fill="transparent"
            strokeWidth={0.25}
            stroke={bestOutline}
            variants={bestVariants}
            style={{ position: "absolute" }}
            animate={best ? "best" : "notBest"}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <Box
            r={radius}
            as="circle"
            stroke="white"
            boxShadow="sm"
            strokeWidth={1.5}
            fill={best ? bestColor : color}
          />
          <motion.circle
            r={radius}
            fill={fill}
            style={{ position: "absolute", userSelect: "none" }}
            animate={{ scale: [1, 4], opacity: [0.2, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
          />
        </Marker>
      </Link>
    </PopoverTrigger>
  );
};
