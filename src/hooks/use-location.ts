import { useEffect, useState } from "react";

import { useRouter } from "next/router";

type LocationBase = Pick<
  Location,
  "hash" | "hostname" | "href" | "origin" | "protocol" | "port" | "host" | "search" | "pathname"
>;

type UseLocation = { readonly [K in keyof LocationBase]: LocationBase[K] };

const defaultLocation: UseLocation = {
  hash: "",
  host: "",
  href: "",
  origin: "",
  protocol: "",
  port: "",
  hostname: "",
  search: "",
  pathname: "",
};

export function useLocation(): UseLocation {
  const { asPath } = useRouter();
  const [location, setLocation] = useState<UseLocation>(defaultLocation);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { hash, host, href, origin, protocol, hostname, search, port } = window.location;
      setLocation({
        hash,
        host,
        hostname,
        href,
        origin,
        pathname: asPath,
        port,
        protocol,
        search,
      });
    }
  }, [asPath]);
  return location;
}
