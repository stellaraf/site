import { BaseIcon } from "./_base";

import type { IconProps } from "./types";

// Bootstrap Icons Caret left fill
export const CaretLeft = (props: IconProps) => (
  <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
  </BaseIcon>
);

// Bootstrap Icons Caret right fill
export const CaretRight = (props: IconProps) => (
  <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
  </BaseIcon>
);
