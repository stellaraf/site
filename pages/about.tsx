import { Box, Flex, Heading } from '@chakra-ui/react';
import { Avatars, Hero, GoogleMap, SEO, GetStarted } from '~/components';
import { useTitle } from '~/hooks';
import { useResponsiveStyle } from '~/styles';
import { getPage, getPageContent, getPageId, getParsedContent } from '~/util';

import type { GetStaticProps } from 'next';
import type { Bio, PageEntry, IAboutPage, ISection, PageContent } from '~/types';

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

const About: React.FC<PageEntry<IAboutPage>> = (props: PageEntry<IAboutPage>) => {
  const { pageData, bios } = props;
  const { title, subtitle, body = null, customProperties, getStarted } = pageData.fields;
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

export const getStaticProps: GetStaticProps<PageEntry<IAboutPage>> = async ctx => {
  const preview = ctx?.preview ?? false;
  let pageData = {} as PageEntry<IAboutPage>['pageData'];
  let pageContent = [] as PageContent[];
  let bios = [] as Bio[];

  try {
    const pageId = await getPageId('about', preview);
    pageData = await getPage<IAboutPage['pageData']>(pageId, preview);
    pageContent = await getPageContent(pageId, preview);
    bios = await getParsedContent<Bio>('bio', preview, { select: 'sys.id,fields' });
  } catch (err) {
    console.error(err);
    throw err;
  }

  return { props: { pageData, pageContent, bios, preview } };
};

export default About;
