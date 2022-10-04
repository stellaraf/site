import type { PageAttrs, PageContent, IDocsGroup } from './content';

export function isPageAttrs(obj: Dict): obj is PageAttrs {
  return 'slug' in obj && !('summary' in obj);
}

export function isPageContent(obj: Dict): obj is PageContent {
  return 'paragraphs' in obj && 'page' in obj;
}

export function isDocsGroups(obj: Dict): obj is IDocsGroup {
  return 'summary' in obj && 'items' in obj;
}

export function notNullUndefined<T>(obj: T): obj is NonNullable<T> {
  return typeof obj !== 'undefined' && obj !== null;
}
