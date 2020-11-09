import { useMemo } from 'react';
import { useColorMode } from 'site/context';

export function useImageSrc(initialUrl: string): string {
  const initialSrc = useMemo(() => initialUrl, [initialUrl]);
  const urlParts = initialUrl.split('/');
  const [fileName, extension] = urlParts.splice(-1)[0].split('.');
  if (typeof window === 'undefined') {
    return initialUrl;
  }
  if (!fileName.match(/\S+\-\-(light|dark)/gi)) {
    return initialSrc;
  }
  const [baseFile] = fileName.split('--');
  const urlBase = urlParts.join('/');
  const { colorMode } = useColorMode();

  const src = useMemo(() => `${urlBase}/${baseFile}--${colorMode}.${extension}`, [
    colorMode,
    initialUrl,
  ]);

  return src;
}
