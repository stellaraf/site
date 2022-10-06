import useLocalStorageState from "use-local-storage-state";

type UseBannerReturn = [boolean, (v: boolean) => void];

export function useBanner(): UseBannerReturn {
  const [acknowledged, setAcknowledged] = useLocalStorageState("stellar-site-banner", {
    defaultValue: false,
  });
  return [acknowledged, setAcknowledged];
}
