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

export { default as docsPageQuery, type DocsPage, type AdmonitionModel } from "./docs-page";

export { default as blogPostQuery, type BlogPost, type ContentTags } from "./blog-post";

export { default as blogPostsQuery, blogPostsByTagsQuery, type BlogPosts } from "./blog-posts";

export { default as blogPostTagsQuery } from "./blog-post-tags";

export { default as documentTagsQuery } from "./document-tags";

export { default as documentGroupsQuery, type DocumentGroups } from "./document-groups";

export { default as employeesQuery, type Employee, type Employees } from "./employees";

export { default as footerGroupsQuery, type FooterGroups } from "./footer-groups";

export { default as headerGroupsQuery, type HeaderGroups } from "./header-groups";

export { default as homePageQuery, type HomePage, type HomePageBlock } from "./home-page";

export {
  default as officeLocationsQuery,
  type Address,
  type OfficeLocation,
  type OfficeLocations,
  type OfficeLocationWithTimezone,
} from "./office-locations";

export {
  default as pageQuery,
  type Callout,
  type Feature,
  type Page,
  type PageContent,
  type PageContents,
  type VendorLogo,
} from "./page";

export * from "./static-paths";

export * from "./static-props";

export { default as themeQuery, type Theme } from "./theme";

export { default as twitterHandleQuery } from "./twitter-handle";
