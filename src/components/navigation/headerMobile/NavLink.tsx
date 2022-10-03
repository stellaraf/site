import { Heading } from '@chakra-ui/react';
import { DynamicIcon, Link } from '~/components';

import type { INavLink } from './types';

export const NavLink: React.FC<INavLink> = (props: INavLink) => {
  const { href, title, ...rest } = props;
  return (
    <Link as={Heading} fontSize="2xl" href={href} _hover={{ textDecoration: 'unset' }} {...rest}>
      {title}
      <DynamicIcon icon={{ fa: 'FaArrowRight' }} ml={4} w={4} h={6} opacity={0.9} />
    </Link>
  );
};
