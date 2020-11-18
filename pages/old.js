import * as React from 'react';
import { Text } from '@chakra-ui/core';
import { GiStack } from 'react-icons/gi';
import { useConfig } from '../context';
import { Logo } from '../components/Logo';
import { Hero } from '../components/Hero';
import { Section } from '../components/Home';
import { CloudComputing } from '../components/Icons';

const Home = () => {
  const { siteSlogan } = useConfig();
  return (
    <>
      <Hero>
        <Logo.Typographic width={400} />
        <Text as="h2" fontSize="3xl" fontWeight="normal" color="whiteAlpha.800">
          {siteSlogan}
        </Text>
      </Hero>
      <Section icon={GiStack}>Content</Section>
      <Section right color="original.secondary" icon={CloudComputing} transformOrigin="top left">
        Content
      </Section>
      <Section icon={GiStack} transformOrigin="top left">
        Content
      </Section>
    </>
  );
};

export default Home;
