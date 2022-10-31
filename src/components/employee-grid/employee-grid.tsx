import { createContext, useContext } from "react";

import { SimpleGrid, useDisclosure } from "@chakra-ui/react";

import { Detail } from "./avatar-detail";
import { Photo } from "./avatar-photo";

import type { EmployeeGridProps, EmployeeGridContext } from "./types";
import type { SimpleGridProps } from "@chakra-ui/react";

const AvatarContext = createContext<EmployeeGridContext>({} as EmployeeGridContext);
export const useAvatar = (): EmployeeGridContext => useContext(AvatarContext);

const AvatarsWrapper = (props: SimpleGridProps) => {
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
export const EmployeeGrid = (props: EmployeeGridProps) => {
  const { employees, ...rest } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <AvatarContext.Provider value={{ employees }}>
      <Detail isOpen={isOpen} onClose={onClose} />
      <AvatarsWrapper {...rest}>
        {employees.map((employee, index) => (
          <Photo key={employee.name} index={index} onOpen={onOpen} gridColumn="span 2" />
        ))}
      </AvatarsWrapper>
    </AvatarContext.Provider>
  );
};
