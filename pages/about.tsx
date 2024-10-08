import { Box, type BoxProps, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import {
  Callout,
  ContentSection,
  Divider,
  EmployeeGrid,
  Hero,
  OfficeLocations,
  Testimonials,
} from "~/components";
import { getHolidays, getLocationTime } from "~/lib/server";
import { commonStaticPropsQuery, employeesQuery, officeLocationsQuery, pageQuery } from "~/queries";
import { type AboutPageProps, Stage } from "~/types";

import type { GetStaticProps, NextPage } from "next";

const Section = (props: React.PropsWithChildren<BoxProps & Pick<AboutPageProps, "title">>) => {
  const { title, children, ...rest } = props;
  const titleMe = useTitleCase();

  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" layerStyle="container" alignItems="center" flexDir="column">
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

  const [employeesSection, valuesSection, locationsSection] = contents;

  return (
    <>
      <Hero title={title} subtitle={subtitle} body={body} />
      <Section title={employeesSection.title}>
        <EmployeeGrid employees={employees} />
      </Section>
      <Divider right my={8} _light={{ opacity: 0 }} />
      <ContentSection content={valuesSection} index={1} />
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
