import type { TActions } from '~/types';
/**
 * Remove actions from the array if they are contained within the list of exclusions.
 */
export function filterActions(slug: string, exclusions: string[] = []): boolean {
  for (const exc of exclusions) {
    const pattern = new RegExp(exc, 'g');
    if (slug.match(pattern)) {
      return false;
    }
  }
  return true;
}

/**
 * Randomize the actions & limit the number of actions returned based on the limit argument.
 */
export function randomActions(limit: number, actions: TActions[]): TActions[] {
  return actions.sort(() => Math.random() - Math.random()).slice(0, limit);
}
