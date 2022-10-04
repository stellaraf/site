type BannerReturn = [boolean, (v: boolean) => void];

import useLocalStorageState from "use-local-storage-state";

export function useBanner(): BannerReturn {
  const [acknowledged, setAcknowledged] = useLocalStorageState("stellar-site-banner", {
    defaultValue: false,
  });
  return [acknowledged, setAcknowledged];
}
