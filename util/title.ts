import zeitTitle from 'title';
import { titleOverrides } from '../siteConfig';

export const titleMe = (text: string, ...special: string[]) =>
  zeitTitle(text, { special: [...titleOverrides, ...special] });
