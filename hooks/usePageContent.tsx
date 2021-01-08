import { useMemo } from 'react';
import { Content } from '~/components';
import { useDate, useRender, useTitle, useSlug } from '~/hooks';

import type { PageContent, UsePageContent } from '~/types';

export const usePageContent = (rawContent: PageContent, deps: unknown[] = []): UsePageContent => {
  if (deps.length === 0) {
    deps = [rawContent];
  }

  const obj = {} as UsePageContent;
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
      image,
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
    if (typeof paragraphs !== 'undefined' && paragraphs?.length !== 0) {
      subsections = <Content.SubSections sections={paragraphs} />;
    }
    if (typeof image !== 'undefined') {
      obj.image = <Content.Image src={image.fields.file.url} />;
    } else {
      obj.image = null;
    }
    obj.showButton = showButton;
    obj.showUpdatedDate = showUpdatedDate;
    obj.subsections = subsections;
  } catch (err) {
    console.error(err);
  }
  return useMemo(() => obj, deps);
};
