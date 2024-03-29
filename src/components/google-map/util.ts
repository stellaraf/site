import { useMemo } from "react";

/**
 * Render an Apple Maps link if the device is an Apple device.
 */
export function useMapUrl(address: string, search: string): string {
  return useMemo<string>(() => {
    const query = encodeURI(search);
    const loc = encodeURI(address);
    const mapUrl = `https://maps.google.com/maps/dir/?api=1&query=${query}&destination=${loc}`;
    return mapUrl;
  }, [address]);
}

// Convenience selectors for Google's generated element classes
export const gm = {
  iw: {
    d: "div.gm-style-iw-a div.gm-style-iw-d",
    t: "div.gm-style-iw-a div.gm-style-iw-t",
    c: "div.gm-style-iw-a div.gm-style-iw.gm-style-iw-c",
    tc: "div.gm-style-iw-a div.gm-style-iw-tc",
    img: "div.gm-style-iw-a button.gm-ui-hover-effect img",
  },
};
