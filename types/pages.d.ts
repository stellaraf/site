namespace React {
  type ReactNode = import('react').ReactNode;
}
namespace Next {
  type AppProps = import('next/app').AppProps;
  type GetStaticProps = import('next').GetStaticProps;
  type GetStaticPaths = import('next').GetStaticPaths;
  type NextPageContext = import('next').NextPageContext;
}

namespace Chakra {
  type BoxProps = import('@chakra-ui/core').BoxProps;
}

namespace Contentful {
  type Asset = import('contentful').Asset;
  type Document = import('@contentful/rich-text-types').Document;
}

namespace Stellar {
  type IFormPlaceholders = import('site/types').IFormPlaceholders;
  type IMeasuredGeoPoint = import('site/types').IMeasuredGeoPoint;
  type HomepageContent = import('site/types').HomepageContent;
  type IFormModelTrial = import('site/types').IFormModelTrial;
  type GlobalConfig = import('site/types').GlobalConfig;
  type IContactCard = import('site/types').IContactCard;
  type IDocsGroup = import('site/types').IDocsGroup;
  type IDocsArticle = import('site/types').IDocsArticle;
  type FooterItem = import('site/types').FooterItem;
  type PageAttrs = import('site/types').PageAttrs;
  type PageProps = import('site/types').PageProps;
  type IActions = import('site/types').IActions;
  type Bio = import('site/types').Bio;
  type PageProps = import('site/types').PageProps;
}

/**
 * _app (All Pages) Types
 */
interface AppInitialProps {
  appProps: {
    globalConfig: Stellar.GlobalConfig;
    footerGroups: Stellar.FooterItem[];
    actions: Stellar.IActions[];
    docsGroups: Stellar.IDocsGroup[];
  };
  children?: React.ReactNode;
}

type SiteProps = AppInitialProps & Next.AppProps;

/**
 * Home Page Types
 */
interface HomeProps {
  pageContent: Stellar.HomepageContent;
}

interface HomeStaticProps {
  props: { pageContent: Stellar.HomeProps };
}

/**
 * Cloud Page Types
 */
interface CloudProps extends Stellar.PageProps {
  geoData: object;
  geoPoints: Stellar.IMeasuredGeoPoint[];
}

/**
 * About Page Types
 */

interface ISection extends Chakra.BoxProps {
  title: string;
}

interface IBioSection extends ISection {
  bios: Stellar.Bio[];
}

interface IMapSection extends ISection {}

/**
 * Contact Page Types
 */

interface IContactCustomProperties {
  metaTitle: string;
}

interface IContactPage extends Omit<Stellar.PageProps, 'pageData'> {
  pageData: Stellar.PageAttrs & { customProperties: Stellar.IContactCustomProperties };
  contactCards: Stellar.IContactCard[];
}

/**
 * Legal Page Types (Dynamic)
 */

interface ILegalPage extends Stellar.PageProps {}

interface IVendorPage {
  pageData: {
    name: string;
    logo: Contentful.Asset['fields'];
    logoColorLightMode: string;
    logoColorDarkMode: string;
    title: string;
    subtitle: string;
    body?: Contentful.Document;
    trialForm?: Stellar.IFormModelTrial;
    partnerLogo?: Contentful.Asset['fields'];
  };
}

/**
 * Cloud Product Pages
 */

interface IPartnerPage {
  pageData: {
    name: string;
    logo: Contentful.Asset['fields'];
    logoColorLightMode: string;
    logoColorDarkMode: string;
    title: string;
    subtitle: string;
    body?: Contentful.Document;
    trialForm?: Stellar.IFormModelTrial;
    partnerLogo?: Contentful.Asset['fields'];
  };
}

/**
 * Docs Pages
 */
interface IDocs {
  docsGroups: Stellar.IDocsGroup[];
}

interface IDocsGroupMain {
  pageData: Stellar.IDocsGroup;
}

interface IDocsMain {
  pageData: Stellar.PageAttrs;
}

interface IDocsArticlePage {
  article: Stellar.IDocsArticle;
}
