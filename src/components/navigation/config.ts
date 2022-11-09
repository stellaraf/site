interface NavConfigItem {
  title: string;
  link: string;
}

const config: NavConfigItem[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Cloud",
    link: "/cloud",
  },
  {
    title: "Services",
    link: "/services",
  },
  {
    title: "Security",
    link: "/security",
  },
  {
    title: "Consulting",
    link: "/consulting",
  },
  { title: "Docs", link: "/docs" },
  { title: "About", link: "/about" },
];

export default config;
