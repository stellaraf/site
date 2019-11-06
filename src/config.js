const commonNavItems = [
    {
        title: "Cloud",
        items: [
            { name: "Compute", link: "/cloud#iaas" },
            { name: "Backups", link: "/cloud#baas" },
            { name: "Disaster Recovery", link: "/cloud#draas" },
            { name: "Security", link: "/cloud#ngfw" }
        ]
    },
    {
        title: "Dedicated IT",
        items: [
            { name: "End User Support", link: "/" },
            { name: "Infrastructure Management", link: "/" },
            { name: "Asset Monitoring", link: "/" },
            { name: "Automation", link: "/" }
        ]
    },
    {
        title: "Design & Deployment",
        items: [
            { name: "Infrastructure Deployment", link: "/" },
            { name: "Network Design", link: "/" },
            { name: "DevOps", link: "/" },
            { name: "Migrations", link: "/" }
        ]
    }
];

export default {
    global: {
        legalName: "Stellar Technologies Inc.",
        givenName: "Stellar",
        salesforceInstanceName: "stellartech",
        navIconSize: 40
    },
    stars: {
        min: 1,
        max: 2000,
        depth: 4,
        baseSize: 0.5,
        factor: 12
    },
    contactForm: {
        message: {
            success: "Thank you!",
            failure: "Something went wrong. Please email us: sales@stellar.tech"
        },
        resetTimeout: 5000
    },
    pages: {
        contact: {
            includeNext: false,
            link: "/contact",
            title: "Talk to Us",
            subtitle: ""
        },
        cloud: {
            includeNext: true,
            nextLead: "Temp Lead",
            link: "/cloud",
            title: "Orion",
            subtitle: "The Enterprise Native Cloud by Stellar",
            sections: {
                one: {
                    title: "Your applications, orbiting your workforce",
                    text:
                        "Our strategically located data centers allow enterprises to substantially reduce latency between end-users and business applications."
                },
                two: {
                    title: "100% Uptime Guarantee",
                    subtitle: "Everyone knows time is money.",
                    text: `We're <i>that</i> confident in the Orion platform. If we fail to deliver on our Service Level Agreement, we'll credit back the amount of time services were unavailable.`
                }
            }
        },
        home: {
            includeNext: false,
            link: "/home",
            headings: {
                title: "Introducing...",
                subtitle: "",
                text: ""
            },
            contactButton: {
                text: "Talk to Us"
            },
            sections: {
                sectionOne: [
                    {
                        title: "Virtual Private Data Center",
                        text: "Custom, Scalable Application Hosting",
                        image: "DataStructure",
                        link: "/cloud"
                    },
                    {
                        title: "Dedicated Services",
                        text: "Your 24/7 Technology Team",
                        image: "CloudComputing",
                        link: "/cloud"
                    },
                    {
                        title: "Design & Deployment",
                        text: "On-Demand IT Special Forces",
                        image: "Diagram",
                        link: "/cloud"
                    }
                ]
            }
        },
        docs: {
            includeNext: true,
            nextLead: "Temp Lead",
            link: "/docs",
            title: "Resources & Documentation",
            subtitle: "SLAs & SOPs",
            sections: [
                {
                    name: "Resources",
                    items: [
                        {
                            name: "Service Level Agreement",
                            id: "docs-sla",
                            link: "/docs/sla"
                        },
                        {
                            name: "Change Control",
                            id: "docs-changecontrol",
                            link: "/docs/change-control"
                        }
                    ]
                },
                {
                    name: "Other",
                    items: [
                        {
                            name: "Other 1",
                            id: "docs-other1",
                            link: "/docs/other1"
                        },
                        {
                            name: "Other 2",
                            id: "docs-other2",
                            link: "/docs/other2"
                        }
                    ]
                }
            ]
        }
    },
    locations: [
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
    ],
    nav: [
        {
            title: "Cloud",
            id: "st-menu-cloud",
            sections: commonNavItems
        }
    ],
    footer: {
        sections: [
            {
                title: "Company",
                items: [
                    { name: "Home", link: "/" },
                    { name: "About", link: "/" },
                    { name: "Careers", link: "/" },
                    { name: "Partners", link: "/" }
                ]
            },
            ...commonNavItems
        ]
    },
    particles: {
        particles: {
            type: "circle",
            number: {
                value: 160,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            line_linked: {
                enable: true,
                opacity: 0.02,
                distance: 48
            },
            move: {
                direction: null,
                random: true,
                speed: 0.25
            },
            size: {
                value: 1,
                random: true
            },
            opacity: {
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.05
                }
            }
        },
        interactivity: {
            events: {
                onclick: {
                    enable: true,
                    mode: "push"
                },
                onhover: {
                    enable: true,
                    mode: "grab"
                }
            },
            modes: {
                push: {
                    particles_nb: 1
                },
                grab: {
                    line_linked: {
                        opacity: 0.2
                    },
                    distance: 200
                }
            }
        },
        retina_detect: true
    }
};

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
        title: "Orion",
        subtitle: "The Enterprise Native Cloud by Stellar"
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

export {
    homeConfig,
    footerConfig,
    siteConfig,
    navConfig,
    contactFormConfig,
    locationConfig,
    pageConfig
};
