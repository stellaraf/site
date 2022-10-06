import { useMemo } from "react";
import { useColorMode } from "~/context";

export function useImageSrc(initialUrl: string): string {
  const { colorMode } = useColorMode();
  const initialSrc = useMemo(() => initialUrl, [initialUrl]);

  return useMemo(() => {
    const urlParts = initialUrl.split("/");
    const [fileName, extension] = urlParts.splice(-1)[0].split(".");
    if (typeof window === "undefined") {
      return initialUrl;
    }
    if (!fileName.match(/\S+--(light|dark)/gi)) {
      return initialSrc;
    }
    const [baseFile] = fileName.split("--");
    const urlBase = urlParts.join("/");

    const src = `${urlBase}/${baseFile}--${colorMode}.${extension}`;
    return src;
  }, [initialUrl, colorMode]);
}
