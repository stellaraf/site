import type { TestMessageParams } from 'yup';

export const requiredMsg = (p: Partial<TestMessageParams>): string => `${p.label} is required.`;
export const invalidMsg = (p: Partial<TestMessageParams>): string =>
  `Must be a valid ${p.label?.toLowerCase()}`;
