import * as React from 'react';
import { forwardRef } from 'react';

export const Pin = forwardRef(({ color = 'currentcolor', size = 24, ...props }, ref) => (
  <svg ref={ref} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path fill="none" stroke={color} strokeWidth={1} d="M12 10a4 4 0 100-8 4 4 0 000 8zm0 0v12" />
  </svg>
));
