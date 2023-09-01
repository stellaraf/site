import { useMemo } from "react";

import type { Address } from "~/queries";

export function useAddress(address: Address, short: boolean = false) {
  const { address1, address2, address3, city, state, zipCode } = address;
  return useMemo(() => {
    const addressLines = [address1, address2, address3].filter(
      a => typeof a === "string" && a !== "",
    );
    if (short) {
      return [addressLines.join(", "), city, `${state} ${zipCode}`].join(", ");
    }
    const allLines = [...addressLines, `${city}, ${state} ${zipCode}`];
    return allLines.join("\n");
  }, [address1, address2, address3, city, state, zipCode, short]);
}
