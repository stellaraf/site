import * as React from "react";
import { createContext, useContext, useMemo } from "react";
import { useMediaLayout } from "use-media";
import { useTheme } from "./Theme";

const MediaContext = createContext(null);

export const MediaProvider = ({ children }) => {
  const { breakpoints } = useTheme();
  const { sm, md, lg, xl } = breakpoints;
  const isSm = useMediaLayout({ maxWidth: md });
  const isMd = useMediaLayout({ minWidth: md, maxWidth: lg });
  const isLg = useMediaLayout({ minWidth: lg, maxWidth: xl });
  const isXl = useMediaLayout({ minWidth: xl });
  let mediaSize = false;
  switch (true) {
    case isSm:
      mediaSize = "sm";
      break;
    case isMd:
      mediaSize = "md";
      break;
    case isLg:
      mediaSize = "lg";
      break;
    case isXl:
      mediaSize = "xl";
      break;
  }
  const value = useMemo(
    () => ({
      isSm,
      isMd,
      isLg,
      isXl,
      mediaSize
    }),
    [mediaSize]
  );
  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
