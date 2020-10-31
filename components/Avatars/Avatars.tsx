import { createContext, useContext } from 'react';
import { SimpleGrid, useDisclosure } from '@chakra-ui/core';
import { Photo } from './Photo';
import { Detail } from './Detail';

import type { IGroupWrapper, IAvatars, IAvatarContext } from './types';

const AvatarContext = createContext<IAvatarContext>(Object());
export const useAvatar = () => useContext(AvatarContext);

const GroupWrapper = (props: IGroupWrapper) => {
  return (
    <SimpleGrid
      my={12}
      justifyContent="space-evenly"
      columns={{ base: 1, lg: 4 }}
      spacingX={{ lg: '25%', xl: '25%' }}
      spacingY={16}
      {...props}
    />
  );
};

/**
 * Group of N Avatars/Bios.
 */
export const Avatars = (props: IAvatars) => {
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
          <Photo key={g.name} index={i} onOpen={onOpen} />
        ))}
      </GroupWrapper>
    </AvatarContext.Provider>
  );
};
