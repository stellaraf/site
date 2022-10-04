import type { Message } from 'yup/lib/types';

export const requiredMsg: Message = params => `${params.label} is required.`;
export const invalidMsg: Message = params => `Must be a valid ${params.label?.toLowerCase()}`;
