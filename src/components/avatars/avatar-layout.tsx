import { createContext, useContext } from "react";
import { SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { Photo } from "./avatar-photo";
import { Detail } from "./avatar-detail";

import type { AvatarsWrapperProps, AvatarsProps, AvatarContextType } from "./types";

const AvatarContext = createContext<AvatarContextType>({} as AvatarContextType);
export const useAvatar = (): AvatarContextType => useContext(AvatarContext);

const AvatarsWrapper = (props: AvatarsWrapperProps) => {
  return (
    <SimpleGrid
      my={12}
      spacingY={16}
      spacingX={{ lg: 32 }}
      columns={{ base: 4, lg: 6 }}
      justifyContent="space-evenly"
      sx={{
        // CSS fuckery to center-align the last row which may not be full.
        // See: https://css-irl.info/controlling-leftover-grid-items
        "& :last-child:nth-of-type(3n - 1)": {
          base: { gridColumnEnd: -2 },
          lg: { gridColumnEnd: -2 },
        },
        "& :nth-last-of-type(2):nth-of-type(3n + 1)": {
          lg: { gridColumnEnd: 4 },
        },
        "& :last-child:nth-of-type(3n - 2)": {
          lg: { gridColumnEnd: { base: 4, lg: 5 } },
        },
      }}
      {...props}
    />
  );
};

/**
 * Group of N Avatars/Bios.
 */
export const Avatars = (props: AvatarsProps) => {
  const { bios, ...rest } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <AvatarContext.Provider value={{ bios }}>
      <Detail isOpen={isOpen} onClose={onClose} />
      <AvatarsWrapper {...rest}>
        {bios.map((g, i) => (
          <Photo key={g.name} index={i} onOpen={onOpen} gridColumn="span 2" />
        ))}
      </AvatarsWrapper>
    </AvatarContext.Provider>
  );
};
