// BsChevronUp

import { BaseIcon } from "./_base";

import type { IconProps } from "./types";

export const ChevronUp = (props: IconProps) => (
  <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <path
      fillRule="evenodd"
      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
    />
  </BaseIcon>
);
