import * as React from 'react';
import { useState } from '@hookstate/core';
import { Divider, Collapse, SimpleGrid } from '@chakra-ui/core';
import { useRender, useMobile } from 'site/hooks';
import { useColorValue } from 'site/context';
import { Photo } from './Photo';

import type { IGroupWrapper, IAvatarGroup, IAvatars } from './types';

const GroupWrapper = (props: IGroupWrapper) => {
  return (
    <SimpleGrid
      my={12}
      justifyContent="space-evenly"
      columns={{ base: 1, lg: 3 }}
      spacingX={{ lg: '25%', xl: '80%' }}
      spacingY={16}
      {...props}
    />
  );
};

const AvatarsDesktop = (props: IAvatarGroup) => {
  const { handlers, isOpen, group, dividerColor, children, ...rest } = props;
  return (
    <>
      <GroupWrapper {...rest}>
        {group.map((g, i) => (
          <Photo key={i} attrs={g} onClick={handlers[i]} />
        ))}
      </GroupWrapper>
      <Collapse isOpen={isOpen} textAlign="center" px={8}>
        <Divider borderColor={dividerColor} />
        {children}
      </Collapse>
    </>
  );
};

const AvatarsMobile = (props: IAvatarGroup) => {
  const { handlers, isOpen, current, group, dividerColor, children, ...rest } = props;
  return (
    <>
      <GroupWrapper {...rest}>
        {group.map((g, i) => (
          <>
            <Photo key={i} attrs={g} onClick={handlers[i]} />
            <Collapse isOpen={isOpen && i === current} textAlign="center" px={8}>
              <Divider borderColor={dividerColor} />
              {children}
            </Collapse>
          </>
        ))}
      </GroupWrapper>
    </>
  );
};

/**
 * Group of N Avatars/Bios.
 */
export const Avatars = (props: IAvatars) => {
  const { bios, ...rest } = props;
  const dividerColor = useColorValue('gray.400', 'original.tertiary');
  const contentNum = useState(0);
  const show = useState(false);
  const handler = (num: number): void => {
    const currentShow = show.get();
    !currentShow && show.set(true);
    currentShow && num === contentNum.value && show.set(false);
    contentNum.set(num);
  };
  const handlers = bios.map((_, i) => (_: any) => handler(i));
  const renderedBio = useRender(bios[contentNum.value].bio);
  const isMobile = useMobile();
  return (
    <>
      {isMobile ? (
        <AvatarsMobile
          handlers={handlers}
          isOpen={show.value}
          current={contentNum.value}
          dividerColor={dividerColor}
          group={bios}
          {...rest}>
          {renderedBio}
        </AvatarsMobile>
      ) : (
        <AvatarsDesktop
          handlers={handlers}
          isOpen={show.value}
          current={contentNum.value}
          dividerColor={dividerColor}
          group={bios}
          {...rest}>
          {renderedBio}
        </AvatarsDesktop>
      )}
    </>
  );
};
