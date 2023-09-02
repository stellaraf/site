import Head from "next/head";
import { useRouter } from "next/router";

import { chakra } from "@chakra-ui/react";

import { commonStaticPropsQuery } from "~/queries";
import { Stage } from "~/types";

import type { GetStaticProps, NextPage } from "next";

const Wrapper = chakra("div", {
  baseStyle: {
    pt: 32,
    zIndex: -2,
    width: "100%",
    color: "black",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    _dark: { color: "white" },
    px: { base: 4, md: 4, lg: 16, xl: 24 },
  },
});

const Header = chakra("h1", {
  baseStyle: { fontSize: { base: "1.5rem", md: "xl", lg: "2xl" }, fontWeight: "light", mb: 32 },
});

const NotFound: NextPage = () => {
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
      </Head>
      <Wrapper>
        <Header>
          <chakra.span color="red.500" _dark={{ color: "red.300" }}>{`${asPath} `}</chakra.span>
          is not a thing...yet.
        </Header>
      </Wrapper>
    </>
  );
};

export default NotFound;

export const getStaticProps: GetStaticProps = async () => {
  const common = await commonStaticPropsQuery({ stage: Stage.Published });
  return { props: { common } };
};
