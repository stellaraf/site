import * as React from 'react';
import { Box, Grid, Heading } from '@chakra-ui/core';
import { useRender, useTitle } from 'site/hooks';
import type { Document } from '@contentful/rich-text-types';
import type { PageContent } from 'site/util/content';

interface SubsectionProps {
  title: string;
  body: Document;
}

interface RenderedPageContent {
  error: string | null;
  title: React.FC;
  subtitle: React.FC;
  body: React.FC | null;
  buttonText?: string;
  buttonLink?: string;
  showButton: boolean;
  subsections: React.FC;
}

const Title = props => <Heading as="h3" fontSize="4xl" {...props} />;
const Subtitle = props => <Heading as="h4" fontSize="xl" fontWeight="light" {...props} />;
const Body = props => (
  <Box
    my={16}
    maxW={[null, null, '60%']}
    whiteSpace="pre-line"
    fontSize="lg"
    textAlign="justify"
    {...props}
  />
);

const Subsections = props => (
  <Grid templateColumns="repeat(2, 1fr)" gap={16} my={16} maxW={[null, null, '80%']} {...props} />
);

const Subsection = ({ title, body }: SubsectionProps) => {
  const renderedBody = useRender(body);
  return (
    <Box>
      <Heading as="h4" fontSize="lg" mb={4}>
        {title}
      </Heading>
      <Box whiteSpace="pre-line" fontSize="lg" textAlign="justify">
        {renderedBody}
      </Box>
    </Box>
  );
};

export const usePageContent = (rawContent: PageContent): RenderedPageContent => {
  let obj = Object();
  let error = null;
  const titleMe = useTitle();
  try {
    const {
      title = '',
      subtitle = '',
      body = null,
      button: showButton = false,
      buttonLink = '',
      buttonText = '',
      paragraphs,
    } = rawContent ?? {};

    let subsections = null;

    obj.title = <Title>{titleMe(title)}</Title>;
    obj.subtitle = <Subtitle>{titleMe(subtitle)}</Subtitle>;
    obj.buttonText = titleMe(buttonText);
    obj.buttonLink = buttonLink;

    if (body) {
      const renderedBody = useRender(body);
      obj.body = <Body>{renderedBody}</Body>;
    } else {
      obj.body = null;
    }
    if (paragraphs?.length ?? 0 !== 0) {
      subsections = (
        <Subsections>
          {paragraphs.map((p, i) => (
            <Subsection key={i} title={titleMe(p.title)} body={p.body} />
          ))}
        </Subsections>
      );
    }
    obj.showButton = showButton;
    obj.subsections = subsections;
  } catch (err) {
    console.error(err);
    error = err.message;
  }
  return { error, ...obj };
};
