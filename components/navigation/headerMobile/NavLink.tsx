import { Heading, Icon } from '@chakra-ui/core';
import { FaArrowRight as RightArrow } from '@meronex/icons/fa';
import { Link } from 'site/components';

import type { INavLink } from './types';

export const NavLink = (props: INavLink) => {
  const { href, title, ...rest } = props;
  return (
    <Link as={Heading} fontSize="2xl" href={href} _hover={{ textDecoration: 'unset' }} {...rest}>
      {title}
      <Icon as={RightArrow} ml={4} w={4} h={6} opacity={0.9} />
    </Link>
  );
};
