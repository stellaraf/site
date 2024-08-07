import { Callout, ContentSection, Hero, Testimonials } from "~/components";
import { commonStaticPropsQuery, pageQuery } from "~/queries";
import { type PageProps, Stage } from "~/types";

import type { GetStaticProps, NextPage } from "next";

type UrlQuery = {
  page: string;
};

const SecurityIndex: NextPage<PageProps> = props => {
  const { title, subtitle, body, contents, callout } = props;

  return (
    <>
      <Hero title={title} subtitle={subtitle} body={body} />
      {contents.map((sect, i) => {
        return <ContentSection content={sect} key={sect.title} index={i} />;
      })}
      {callout && <Callout {...callout} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  const page = await pageQuery({ slug: "security", stage });
  const common = await commonStaticPropsQuery({ stage });
  return { props: { ...page, draft, common } };
};

export default SecurityIndex;
