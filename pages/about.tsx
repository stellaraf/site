import { Box, type BoxProps, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { EmployeeGrid, Hero, GoogleMap, Callout, Testimonials } from "~/components";
import { useResponsiveStyle } from "~/hooks";
import { pageQuery, employeesQuery, commonStaticPropsQuery } from "~/queries";

import type { GetStaticProps, NextPage } from "next";
import type { AboutPageProps } from "~/types";

const Section = (props: React.PropsWithChildren<BoxProps & Pick<AboutPageProps, "title">>) => {
  const { title, children, ...rest } = props;
  const rStyles = useResponsiveStyle();
  const titleMe = useTitleCase();

  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        <Heading as="h3" fontSize="4xl">
          {titleMe(title)}
        </Heading>
        {children}
      </Flex>
    </Box>
  );
};

const About: NextPage<AboutPageProps> = props => {
  const { title, subtitle, body, contents, callout, employees } = props;

  const [employeesSection, locationsSection] = contents;

  return (
    <>
      <Hero title={title} subtitle={subtitle} body={body} />
      <Section title={employeesSection.title}>
        <EmployeeGrid employees={employees} />
      </Section>
      <Section title={locationsSection.title}>
        <GoogleMap />
      </Section>
      <Testimonials />
      {callout && <Callout {...callout} />}
    </>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async ctx => {
  const preview = ctx?.preview ?? false;
  const page = await pageQuery({ slug: "about" });
  const employees = await employeesQuery();
  const common = await commonStaticPropsQuery();

  return { props: { ...page, employees, preview, common } };
};

export default About;
