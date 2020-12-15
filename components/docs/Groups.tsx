import { Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { AnimatedBox } from 'site/components';
import { useConfig } from 'site/context';
import { GroupCard } from './GroupCard';

export const Groups = () => {
  const { docsGroups } = useConfig();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-100px' });
  return (
    <Flex align="center" justify="center" m={4}>
      <Wrap spacing={8} ref={ref} justify="center">
        {inView &&
          docsGroups.map((group, i) => (
            <WrapItem key={`docsGroup${i}`}>
              <AnimatedBox
                zIndex={1}
                animate={{ x: 0 }}
                key={`docsGroup${i}`}
                initial={{ x: '100%' }}
                whileTap={{ y: '-3%' }}
                whileHover={{ y: '-5%' }}
                transition={{ delay: i * 0.1 }}>
                <GroupCard {...group} />
              </AnimatedBox>
            </WrapItem>
          ))}
      </Wrap>
    </Flex>
  );
};
