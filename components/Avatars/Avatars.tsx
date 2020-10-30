import { useState } from '@hookstate/core';
import { SimpleGrid, useDisclosure } from '@chakra-ui/core';
import { useRender } from 'site/hooks';
import { Photo } from './Photo';
import { Detail } from './Detail';

import type { IGroupWrapper, IAvatars } from './types';

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
  const contentNum = useState(0);
  const disclosure = useDisclosure();

  const handler = (num: number): void => {
    contentNum.set(num);
    disclosure.onOpen();
  };
  const handlers = bios.map((_, i) => (_: any) => handler(i));
  const renderedBio = useRender(bios[contentNum.value].bio);

  // Sort bios alphabetically first, then by sortWeight.
  const sortedBios = bios
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .sort((a, b) => a.sortWeight - b.sortWeight);

  return (
    <>
      <Detail
        body={renderedBio}
        name={bios[contentNum.value].name}
        title={bios[contentNum.value].title}
        photo={bios[contentNum.value].photo}
        {...disclosure}
      />
      <GroupWrapper {...rest}>
        {sortedBios.map((g, i) => (
          <Photo key={i} attrs={g} onClick={handlers[i]} />
        ))}
      </GroupWrapper>
    </>
  );
};
