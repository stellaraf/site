import { StellarLogo } from "@stellaraf/logo";
import { motion, AnimatePresence } from "framer-motion";

import { Link } from "~/components";
import { useColorMode } from "~/context";
import { forwardRef } from "~/util";

import type { HeaderLogoProps } from "./types";

export const HeaderLogo = forwardRef<HTMLDivElement, HeaderLogoProps>((props, ref) => {
  const { show } = props;
  const { colorMode } = useColorMode();
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={ref}
          key="headerLogo"
          exit={{ y: "100%" }}
          animate={{ y: "0%" }}
          initial={{ y: "100%" }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/" _focus={{ boxShadow: "unset" }} pb={4}>
            <StellarLogo noAnimate colorMode={colorMode} width={160} height={56} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
