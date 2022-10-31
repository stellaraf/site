import { useRouter } from "next/router";

import { chakra } from "@chakra-ui/react";

import { SEO } from "~/components";
import { useGradient } from "~/hooks";

const Wrapper = chakra("div", {
  baseStyle: {
    width: "100%",
    height: "100vh",
    color: { _dark: "white", _light: "black" },
    pt: 32,
    px: { base: 4, md: 4, lg: 16, xl: 24 },
    zIndex: -2,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Header = chakra("h1", {
  baseStyle: { fontSize: { base: "1.5rem", md: "xl", lg: "2xl" }, fontWeight: "light", mb: 32 },
});

const NotFound = () => {
  const bg = useGradient();
  const { asPath } = useRouter();

  return (
    <>
      <SEO title="Not Found" noindex nofollow />
      <Wrapper {...bg}>
        <Header>
          <chakra.span color={{ _light: "red.500", _dark: "red.300" }}>{`${asPath} `}</chakra.span>
          is not a thing...yet.
        </Header>
      </Wrapper>
    </>
  );
};
export default NotFound;
