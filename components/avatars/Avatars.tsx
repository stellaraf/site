import { createContext, useContext } from 'react';
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Photo } from './Photo';
import { Detail } from './Detail';

import type { IGroupWrapper, IAvatars, IAvatarContext } from './types';

const AvatarContext = createContext<IAvatarContext>(Object());
export const useAvatar = (): IAvatarContext => useContext(AvatarContext);

const GroupWrapper: React.FC<IGroupWrapper> = (props: IGroupWrapper) => {
  return (
    <SimpleGrid
      my={12}
      spacingY={16}
      spacingX={{ lg: 32 }}
      columns={{ base: 4, lg: 6 }}
      justifyContent="space-evenly"
      // CSS fuckery to center-align the last row which may not be full.
      // See: https://css-irl.info/controlling-leftover-grid-items
      sx={{
        '& :last-child:nth-of-type(3n - 1)': { gridColumnEnd: -2 },
        '& :nth-last-of-type(2):nth-of-type(3n + 1)': { gridColumnEnd: 4 },
        '& :last-child:nth-of-type(3n - 2)': { gridColumnEnd: { base: 4, lg: 5 } },
      }}
      {...props}
    />
  );
};

/**
 * Group of N Avatars/Bios.
 */
export const Avatars: React.FC<IAvatars> = (props: IAvatars) => {
  const { bios, ...rest } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  // Sort bios alphabetically first, then by sortWeight.
  const sortedBios = bios
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .sort((a, b) => a.sortWeight - b.sortWeight);

  return (
    <AvatarContext.Provider value={{ bios: sortedBios }}>
      <Detail isOpen={isOpen} onClose={onClose} />
      <GroupWrapper {...rest}>
        {sortedBios.map((g, i) => (
          <Photo key={g.name} index={i} onOpen={onOpen} gridColumn="span 2" />
        ))}
      </GroupWrapper>
    </AvatarContext.Provider>
  );
};
