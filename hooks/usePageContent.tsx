import * as React from 'react';
import { useMemo } from 'react';
import { Content } from 'site/components';
import { useDate, useRender, useTitle, useSlug } from 'site/hooks';

import type { PageContent, UsePageContent } from 'site/types';

/**
 *
 */
export const usePageContent = (rawContent: PageContent, [...deps]: any[] = []): UsePageContent => {
  if (deps.length === 0) {
    deps = [rawContent];
  }
  let obj = Object();
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
      updatedAt,
      showUpdatedDate = false,
    } = rawContent ?? {};

    let subsections = null;
    const slug = useSlug(title, [rawContent]);
    const updated = useDate(updatedAt);

    obj.title = <Content.Title id={slug}>{title}</Content.Title>;
    obj.subtitle = <Content.Subtitle>{subtitle}</Content.Subtitle>;
    obj.buttonText = titleMe(buttonText);
    obj.buttonLink = buttonLink;
    obj.updatedAt = <Content.UpdatedAt>{updated}</Content.UpdatedAt>;

    if (body) {
      const renderedBody = useRender(body);
      obj.body = <Content.Body>{renderedBody}</Content.Body>;
    } else {
      obj.body = null;
    }
    if (paragraphs?.length ?? 0 !== 0) {
      subsections = <Content.SubSections sections={paragraphs} />;
    }
    obj.showButton = showButton;
    obj.showUpdatedDate = showUpdatedDate;
    obj.subsections = subsections;
  } catch (err) {
    console.error(err);
  }
  return useMemo(() => obj, deps);
};
