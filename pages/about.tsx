import { Box, Flex, Heading } from '@chakra-ui/react';
import { getPage, getPageContent, getContent } from '~/util';
import { Avatars, Hero, GoogleMap, SEO, GetStarted } from '~/components';
import { useTitle } from '~/hooks';
import { useResponsiveStyle } from '~/styles';

import type { GetStaticProps } from 'next';
import type { Bio, IAboutPage, ISection, IAboutPageAttrs, PageContent } from '~/types';

const Section: React.FC<ISection> = (props: ISection) => {
  const { title, children, ...rest } = props;
  const rStyles = useResponsiveStyle();
  const titleMe = useTitle();
  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        <Heading as="h3" fontSize="4xl">
          {titleMe(title)}
        </Heading>
        {children}
      </Flex>
    </Box>
  );
};

const About: React.FC<IAboutPage> = (props: IAboutPage) => {
  const { pageData, bios } = props;
  const { title, subtitle, body = null, customProperties, getStarted } = pageData;
  const { employeesTitle = '', mapTitle = '' } = customProperties;

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={body} />
      <Section title={employeesTitle}>
        <Avatars bios={bios} />
      </Section>
      <Section title={mapTitle}>
        <GoogleMap />
      </Section>
      {getStarted && <GetStarted {...getStarted.fields} />}
    </>
  );
};

export const getStaticProps: GetStaticProps<IAboutPage> = async ctx => {
  const preview = ctx?.preview ?? false;
  let pageData = {} as IAboutPageAttrs;
  let pageContent = [] as PageContent[];
  let bios = [] as Bio[];
  try {
    pageData = await getPage<IAboutPageAttrs>('about', preview);
    pageContent = await getPageContent(pageData?.id ?? null, preview);
    bios = await getContent<Bio>('bio', preview);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { props: { pageData, pageContent, bios, preview } };
};

export default About;
