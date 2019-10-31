const siteConfig = {
    legalName: "Stellar Technologies Inc.",
    givenName: "Stellar",
    salesforceInstanceName: "stellartech",
    navIconSize: 40
};

const contactFormConfig = {
    message: {
        success: "Thank you!",
        failure: "Something went wrong. Please email us: sales@stellar.tech"
    },
    resetTimeout: 5000
};

const pageConfig = {
    contact: {
        title: "Contact",
        subtitle: ""
    },
    cloud: {
        title: "Cloud Presence",
        subtitle: ""
    }
};

const locationConfig = [
    {
        id: "phx01",
        name: "Phoenix, AZ",
        subtitle: "",
        info: "But it's a dry data center."
    },
    {
        id: "hnl01",
        name: "Honolulu, HI",
        subtitle: "",
        info: "The data center you definitely need to audit."
    },
    {
        id: "chi01",
        name: "Chicago, IL",
        subtitle: "",
        info: "The windiest data center."
    },
    {
        id: "atl01",
        name: "Atlanta, GA",
        subtitle: "On the 2020 Horizon",
        info: "It may be hot outside, but not in this data center."
    },
    {
        id: "sac01",
        name: "Sacramento, CA",
        subtitle: "On the 2020 Horizon",
        info: "The cloud's most hipster data center."
    },
    {
        id: "pdx01",
        name: "Portland, OR",
        subtitle: "On the 2020 Horizon",
        info: "Put a bird on your data center."
    }
];

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
                    { name: "Feature 1", link: "/cloud" },
                    { name: "Feature 2", link: "/cloud" },
                    { name: "Feature 3", link: "/cloud" }
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

const homeConfig = {
    homeOne: {
        headings: ["Title", "tagline words"],
        text: ""
    },
    contactButton: {
        text: "Talk to Us"
    },
    sections: {
        sectionOne: [
            {
                title: "Placeholder 1",
                text: "Cool stories 1",
                image: "IconNotFound"
            },
            {
                title: "Placeholder 2",
                text: "Cool stories 2",
                image: "IconNotFound"
            },
            {
                title: "Placeholder 3",
                text: "Cool stories 3",
                image: "IconNotFound"
            },
            {
                title: "Placeholder 4",
                text: "Cool stories 4",
                image: "IconNotFound"
            }
        ]
    }
};

const footerConfig = {
    sections: [
        {
            title: "Company",
            links: [
                { name: "Home", link: "" },
                { name: "About", link: "" },
                { name: "Careers", link: "" },
                { name: "Partners", link: "" },
                { name: "Blog", link: "#" }
            ]
        },
        {
            title: "Cloud",
            links: [
                { name: "Compute", link: "/cloud" },
                { name: "Backups", link: "/cloud" },
                { name: "Disaster Recovery", link: "/cloud" },
                { name: "Security", link: "/cloud" }
            ]
        }
    ]
};

module.exports = {
    homeConfig,
    footerConfig,
    siteConfig,
    navConfig,
    contactFormConfig,
    locationConfig,
    pageConfig
};
