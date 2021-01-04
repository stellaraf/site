import dynamic from 'next/dynamic';
import { Heading, Icon } from '@chakra-ui/react';
import { Link } from '~/components';

const RightArrow = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/fa').then(i => i.FaArrowRight),
);

import type { INavLink } from './types';

export const NavLink: React.FC<INavLink> = (props: INavLink) => {
  const { href, title, ...rest } = props;
  return (
    <Link as={Heading} fontSize="2xl" href={href} _hover={{ textDecoration: 'unset' }} {...rest}>
      {title}
      <Icon as={RightArrow} ml={4} w={4} h={6} opacity={0.9} />
    </Link>
  );
};
