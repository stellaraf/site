import { DHeader } from "./desktop-header";
import { MHeader } from "./mobile-header";

import type { HeaderProps } from "./types";

export const Header = (props: HeaderProps) => {
  return (
    <>
      <DHeader display={{ base: "none", lg: "block" }} {...props} />
      <MHeader display={{ lg: "none" }} {...props} />
    </>
  );
};
