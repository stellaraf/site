import * as React from 'react';
import { useRef } from 'react';
import { GetStaticProps } from 'next';
import { getPage, getPageContent } from 'site/util';
import { ContentSection, Hero, SEO } from 'site/components';
import { useActiveSection } from 'site/hooks';

import type { PageProps } from 'site/types';

const SLUG = 'services';

export default function Services(props: PageProps) {
  const { pageData, pageContent } = props;
  const { title, subtitle } = pageData;
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);
  const sectionRefs = sections.map(() => useRef());

  useActiveSection(sectionRefs);

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} />
      {sectionRefs.map((ref, i) => {
        return (
          <ContentSection ref={ref} items={sections[i]} index={i % sectionRefs.length} key={i} />
        );
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
