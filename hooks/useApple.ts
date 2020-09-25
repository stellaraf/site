import { useEffect, useState } from 'react';

const PLATFORMS = ['iPhone', 'iPad', 'iPod', 'Mac'];

export function useApple(): boolean {
  let [isApple, setApple] = useState<boolean>(false);
  useEffect(() => {
    const { platform } = navigator;
    for (let platName of PLATFORMS) {
      if (platform.toLowerCase().includes(platName.toLowerCase())) {
        !isApple && setApple(true);
        break;
      }
    }
  }, []);
  return isApple;
}
