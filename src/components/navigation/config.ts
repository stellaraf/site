interface NavConfigItem {
  title: string;
  link: string;
}
interface NavConfig {
  left: NavConfigItem[];
  right: NavConfigItem[];
}

const config: NavConfig = {
  left: [
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
      title: "Consulting",
      link: "/consulting",
    },
  ],
  right: [
    { title: "About", link: "/about" },
    { title: "Docs", link: "/docs" },
  ],
};

export default config;
