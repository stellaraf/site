import * as React from 'react';
import { Box, Grid, Heading, Text } from '@chakra-ui/core';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const renderRichText = txt =>
  documentToReactComponents(txt, {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => <Text my={8}>{children}</Text>,
    },
  });

const Title = props => <Heading as="h3" fontSize="4xl" {...props} />;
const Subtitle = props => <Heading as="h4" fontSize="xl" fontWeight="light" {...props} />;
const Body = props => (
  <Text
    my={16}
    maxW={[null, null, '60%']}
    whiteSpace="pre-line"
    fontSize="lg"
    textAlign="justify"
    {...props}
  />
);

const Subsections = ({ props, children }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={16} my={16} maxW={[null, null, '80%']} {...props}>
      {children}
    </Grid>
  );
};

const Subsection = ({ title, body }) => {
  return (
    <Box>
      <Heading as="h4" fontSize="lg" mb={4}>
        {title}
      </Heading>
      <Box whiteSpace="pre-line" fontSize="lg" textAlign="justify">
        {renderRichText(body)}
      </Box>
    </Box>
  );
};

export const usePageContent = rawContent => {
  let obj = {};
  let error;
  try {
    const {
      title: rawTitle,
      subtitle: rawSubtitle,
      body: bodyObj,
      button: showButton,
      buttonLink: rawButtonLink,
      buttonText: rawButtonText,
      paragraphs,
    } = rawContent ?? {};
    let body = null;
    let subsections = null;

    obj.title = <Title>{rawTitle}</Title>;
    obj.subtitle = <Subtitle>{rawSubtitle}</Subtitle>;
    obj.buttonText = rawButtonText;
    obj.buttonLink = rawButtonLink;

    if (bodyObj) {
      body = <Body>{renderRichText(bodyObj)}</Body>;
    }
    if (paragraphs?.length ?? 0 !== 0) {
      subsections = (
        <Subsections>
          {paragraphs.map((p, i) => (
            <Subsection key={i} title={p.title} body={p.body} />
          ))}
        </Subsections>
      );
    }
    obj.showButton = showButton;
    obj.body = body;
    obj.subsections = subsections;
  } catch (err) {
    console.error(err);
    error = err.message;
  }
  return { error, ...obj };
};
