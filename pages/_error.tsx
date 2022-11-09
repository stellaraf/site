import { chakra } from "@chakra-ui/react";

import { SEO, Error } from "~/components";
import { useGradient } from "~/hooks";

import type { PageWithInitialProps } from "~/types";

interface ErrorPageProps {
  statusCode?: number;
  error?: string;
}

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

const ErrorPage: PageWithInitialProps<ErrorPageProps> = props => {
  const { statusCode = 500, error = "Something went wrong" } = props;
  const bg = useGradient();

  console.error(error);

  return (
    <>
      <SEO title="Error" noindex nofollow />
      <Wrapper {...bg}>
        <Error title={`${statusCode} Error`} description={error} />
      </Wrapper>
    </>
  );
};

ErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};

export default ErrorPage;
