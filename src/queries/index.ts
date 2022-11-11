export { default as actionsQuery, type Actions } from "./actions";

export {
  default as cloudLocationsQuery,
  type CloudLocation,
  type CloudLocations,
} from "./cloud-locations";

export { default as configQuery, type Config, type Testimonial } from "./config";

export {
  default as contactFormsQuery,
  type ContactForm,
  type ContactFormFields,
  type ContactForms,
} from "./contact-forms";

export { default as docsGroupQuery } from "./docs-group";

export { default as docsGroupsQuery, type DocsGroups, type DocsGroup } from "./docs-groups";

export { default as docsGroupStaticPathsQuery } from "./docs-group-static-paths";

export { default as docsPageQuery, type DocsPage, type AdmonitionModel } from "./docs-page";

export { default as docsPageStaticPathsQuery } from "./docs-page-static-paths";

export { default as employeesQuery, type Employee, type Employees } from "./employees";

export { default as footerGroupsQuery, type FooterGroups } from "./footer-groups";

export { default as homePageQuery, type HomePage, type HomePageBlock } from "./home-page";

export {
  default as pageQuery,
  type Callout,
  type Feature,
  type Page,
  type PageContent,
  type PageContents,
  type VendorLogo,
} from "./page";

export { default as pageStaticPathsQuery } from "./page-static-paths";
export { default as pageStaticPathsExactQuery } from "./page-static-paths-exact";

export * from "./static-props";

export { default as themeQuery, type Theme } from "./theme";
