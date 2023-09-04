import { useRouter } from "next/router";

export function useIsActive(slug: string): boolean {
  const { asPath } = useRouter();

  let isActive = false;
  if (asPath === "/" && slug === "/") {
    isActive = true;
  } else if (slug !== "/") {
    const match = asPath.match(new RegExp(slug, "gi")) ?? [];
    isActive = match.length !== 0;
  }
  return isActive;
}
