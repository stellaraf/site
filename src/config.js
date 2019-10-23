// const theme = {
//   global: {
//     font: {
//       family: "Roboto",
//       size: "18px",
//       height: "20px"
//     },
//     colors: {
//       brand: "#266dd3",
//       black: "#071013",
//       white: "fcfcfc"
//     }
//   }
// };

const siteConfig = {
  legalName: "Stellar Technologies Inc.",
  navIconSize: 40
};

const navConfig = [
  {
    title: "Cloud",
    id: "st-menu-cloud",
    style: {},
    sections: [
      {
        title: "Features",
        style: {},
        items: [
          { name: "Feature 1", link: "#" },
          { name: "Feature 2", link: "#" },
          { name: "Feature 3", link: "#" }
        ]
      },
      {
        title: "Solutions",
        style: {},
        items: [
          { name: "Solution 1", link: "#" },
          { name: "Solution 2", link: "#" },
          { name: "Solution 3", link: "#" },
          { name: "Solution 4", link: "#" },
          { name: "Solution 5", link: "#" }
        ]
      }
    ]
  },
  {
    title: "Services",
    id: "st-menu-services",
    style: {},
    sections: [
      {
        title: "Managed IT",
        style: {},
        items: [
          { name: "Managed IT 1", link: "#" },
          { name: "Managed IT 2", link: "#" },
          { name: "Managed IT 3", link: "#" }
        ]
      },
      {
        title: "Systems Architecture & Deployment",
        style: {},
        items: [
          { name: "Projects 1", link: "#" },
          { name: "Projects 2", link: "#" },
          { name: "Projects 3", link: "#" }
        ]
      },
      {
        title: "Infrastructure Automation",
        style: {},
        items: [
          { name: "Projects 1", link: "#" },
          { name: "Projects 2", link: "#" },
          { name: "Projects 3", link: "#" }
        ]
      }
    ]
  }
];

const heroConfig = {
  homeOne: {
    headings: ["Title", "tagline words"],
    text: ""
  }
};

const footerConfig = {
  sections: [
    {
      title: "Company",
      links: [
        { name: "Home", link: "#" },
        { name: "About", link: "#" },
        { name: "Careers", link: "#" },
        { name: "Partners", link: "#" },
        { name: "Blog", link: "#" }
      ]
    },
    {
      title: "Cloud",
      links: [
        { name: "Compute", link: "#" },
        { name: "Backups", link: "#" },
        { name: "Disaster Recovery", link: "#" },
        { name: "Security", link: "#" }
      ]
    }
  ]
};

module.exports = { heroConfig, footerConfig, siteConfig, navConfig };
