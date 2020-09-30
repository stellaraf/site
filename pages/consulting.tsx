import * as React from 'react';
import { getPage, getPageContent } from 'site/util';
import { ContentSection, Hero, SEO } from 'site/components';
import { useRender } from 'site/hooks';

import type { PageProps, GetStaticProps } from 'site/types';

const SLUG = 'consulting';

export default function Consulting(props: PageProps) {
  const { pageData, pageContent } = props;
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);

  const { title, subtitle, body } = pageData;
  const renderedBody = useRender(body);

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={renderedBody} />
      {sections.map((sect, i) => {
        return <ContentSection items={sect} key={i} />;
      })}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let pageData = Object();
  let pageContent = Array();
  try {
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData, pageContent } };
};
