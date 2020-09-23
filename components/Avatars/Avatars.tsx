import * as React from 'react';
import { PhotoGroup } from './PhotoGroup';

import type { Bio, AvatarsProps } from './types';

/**
 * Transform an array of Bios into an array of Bio arrays, grouped by size argument.
 */
function groupBios(bios: Bio[], size: number): Bio[][] {
  let groups = [];
  while (bios.length > 0) {
    groups.push(bios.splice(0, size));
  }
  return groups;
}

/**
 * Grouped Avatars, subgrouped into groups of N size for layout purposes.
 */
export const Avatars = (props: AvatarsProps) => {
  const { bioList, ...rest } = props;
  const bioGroups = groupBios(bioList, 3);
  return (
    <>
      {bioGroups.map((group, i) => (
        <PhotoGroup key={i} group={group} {...rest} />
      ))}
    </>
  );
};
