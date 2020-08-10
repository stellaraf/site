import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ScrollToTopOnMount() {
  const { pathname: location } = useRouter();
  // const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
