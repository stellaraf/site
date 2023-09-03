import { Box, type BoxProps, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { EmployeeGrid, Hero, Callout, Testimonials, OfficeLocations } from "~/components";
import { useResponsiveStyle } from "~/hooks";
import { getLocationTime, getHolidays } from "~/lib/server";
import { pageQuery, employeesQuery, commonStaticPropsQuery, officeLocationsQuery } from "~/queries";
import { Stage, type AboutPageProps } from "~/types";

import type { GetStaticProps, NextPage } from "next";

const Section = (props: React.PropsWithChildren<BoxProps & Pick<AboutPageProps, "title">>) => {
  const { title, children, ...rest } = props;
  const rStyles = useResponsiveStyle();
  const titleMe = useTitleCase();

  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        <Heading as="h3" fontSize={{ base: "3xl", md: "4xl" }}>
          {titleMe(title)}
        </Heading>
        {children}
      </Flex>
    </Box>
  );
};

const About: NextPage<AboutPageProps> = props => {
  const { title, subtitle, body, contents, callout, employees, officeLocations, holidays } = props;

  const [employeesSection, locationsSection] = contents;

  return (
    <>
      <Hero title={title} subtitle={subtitle} body={body} />
      <Section title={employeesSection.title}>
        <EmployeeGrid employees={employees} />
      </Section>
      <Section title={locationsSection.title}>
        <OfficeLocations
          officeLocations={officeLocations}
          orgName={props.common.config.organizationName}
          holidays={holidays}
        />
      </Section>
      <Testimonials />
      {callout && <Callout {...callout} />}
    </>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async ctx => {
  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  const page = await pageQuery({ slug: "about", stage });
  const employees = await employeesQuery({ stage });
  const locations = await officeLocationsQuery();
  const common = await commonStaticPropsQuery({ stage });
  const holidays = getHolidays();

  const officeLocations = await Promise.all(
    locations.map(async loc => {
      const tz = await getLocationTime(loc.location.latitude, loc.location.longitude);
      return { ...loc, ...tz };
    }),
  );

  return { props: { ...page, employees, officeLocations, draft, holidays, common } };
};

export default About;
