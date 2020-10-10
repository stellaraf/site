import type { TestMessageParams } from 'yup';

export const requiredMsg = (p: Partial<TestMessageParams>) => `${p.label} is required.`;
export const invalidMsg = (p: Partial<TestMessageParams>) =>
  `Must be a valid ${p.label?.toLowerCase()}`;
