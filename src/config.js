import theme from "styles/exports.module.scss";

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
            { name: "End User Support", link: "/services" },
            { name: "Infrastructure Management", link: "/services" },
            { name: "Asset Monitoring", link: "/services" },
            { name: "Automation", link: "/services" }
        ]
    },
    {
        title: "Design & Deployment",
        items: [
            { name: "Infrastructure Deployment", link: "/consulting" },
            { name: "Network Design", link: "/consulting" },
            { name: "DevOps", link: "/consulting" },
            { name: "Migrations", link: "/consulting" }
        ]
    }
];

const site = {
    global: {
        legalName: "Stellar Technologies Inc.",
        givenName: "Stellar",
        salesforceInstanceName: "stellartech",
        navIconSize: 40,
        logoTransitionScroll: 120,
        nextSectionTitle: "Ready for more?"
    },
    stars: {
        min: 1,
        max: 2000,
        depth: 4,
        baseSize: 0.5,
        factor: 12
    },
    notfound: {
        title: "Not Found",
        subtitle: "might be adrift in space...",
        buttonText: "Back"
    },
    social: [
        { name: "Facebook", link: "https://www.facebook.com/stellar_tech" },
        { name: "LinkedIn", link: "https://linkedin.com/company/stellaraf" },
        { name: "Github", link: "https://github.com/stellaraf" },
        { name: "Twitter", link: "https://twitter.com/stellar_tech" }
    ],
    contactForm: {
        message: {
            success: "Thank you!",
            failure: "Something went wrong. Please email us: sales@stellar.tech"
        },
        resetTimeout: 5000
    },
    pages: {
        about: {
            includeNext: false,
            link: "/about",
            title: "What makes us so stellar?",
            subtitle: "We're glad you asked..."
        },
        contact: {
            includeNext: false,
            link: "/contact",
            title: "Talk to Us",
            subtitle: ""
        },
        cloud: {
            includeNext: true,
            nextLead: "Gravitate to the upper echelon of cloud",
            link: "/cloud",
            title: "Orion",
            subtitle: "The Enterprise Native Cloud by Stellar",
            sections: {
                one: {
                    title: "Your applications, orbiting your workforce",
                    text:
                        "Our strategically located data centers allow enterprises to substantially reduce latency between end-users and business applications."
                },
                info: [
                    {
                        title: "100% Uptime Guarantee",
                        subtitle: "Because time is money.",
                        text: `We're _that_ confident in the Orion platform. If we fail to deliver on our <Link to="/docs/sla">Service Level Agreement</Link>, we'll credit back the amount of time services were unavailable.`
                    },
                    {
                        title: "Infrastructure as a Service",
                        subtitle: "Virtual Private Data Center at the speed of light",
                        content: [
                            {
                                title: "Compute",
                                text: `The Orion compute infrastructure is built to sustain the most intense workloads your business can demand.<br/><br/>
                                As an engineer-led team with some of the highest performance standards in the universe, we don't mess around when it comes to our infrastructure.<br/><br/>
                                Our servers are packed with high-performance <Intel className="inline-icon" height={32} color={${theme.stWhite}} /> CPUs, the fastest RAM money can buy, and dedicated 100 Gbps networking.`
                            },
                            {
                                title: "Storage",
                                text: `As one of the fastest moving cloud platforms on the planet, we're obsessed with guaranteeing insanely fast I/O performance.<br/><br/>
                                Orion production workloads uncompromisingly run on 100% dedicated SSD <PureStorage className="inline-icon" height={28} color={${theme.stWhite}}/> arrays backed by 160 Gbps of storage networking capacity per array.
                            `
                            },
                            {
                                title: "Platform",
                                text: `The Orion platform is completely powered by <VMware className="inline-icon" height={12} color={${theme.stWhite}}/>, so you can rest easy knowing your critical infrastructure is running on the most reliable hypervisor in existence.<br/><br/>
                                Orion natively supports virtually any operating system in existence, and can be easily populated with your own custom ISO builds if needed.`
                            },
                            {
                                title: "Connectivity",
                                text: `Powering the Orion platform is our transpacific & transcontinental private network, interconnected by redundant 10 Gbps long haul transport paths, enabling enterprises to spin up and scale resources without worrying about latency.<br/><br/>
                                With every Orion virtual private data center we include access to our highly redundant internet edge with 100 Mbps of symmetrical bandwidth (no data caps!) for free.
                                `
                            }
                        ]
                    },
                    {
                        title: "Data Protection",
                        subtitle: "We've got you covered",
                        content: [
                            { title: "Backups as a Service", text: "BaaS Text" },
                            { title: "Disaster Recovery as a Service", text: "DRaaS Text" }
                        ]
                    }
                ]
            }
        },
        services: {
            includeNext: true,
            nextLead: "Make our stellar engineers your Stellar IT Team",
            link: "/services",
            title: "Dedicated IT Services",
            subtitle: "Your 24/7 Technology Team"
        },
        consulting: {
            includeNext: true,
            nextLead: "Burst to our supreme infrastructure team",
            link: "/consulting",
            title: "Infrastructure Consulting",
            subtitle: "On-Demand IT Special Forces"
        },
        home: {
            includeNext: false,
            link: "/home",
            title: "Home",
            headings: {
                title: "Introducing...",
                subtitle: "",
                text: "Text about what we do, how cool we are, and how we are Stellar AF"
            },
            contactButton: {
                text: "Talk to Us"
            },
            sections: {
                sectionOne: [
                    {
                        title: "Orion",
                        subtitle: "The Enterprise Native Cloud Platform",
                        link: "/cloud",
                        text: null
                    },
                    {
                        title: "Dedicated Services",
                        subtitle: "Your 24/7 Technology Team",
                        link: "/services",
                        text: `As a skilled team of engineers who have supported businesses and technologies of all types for decades at a global scale, we're experts at meeting the demands of operating business technology.
                        
                        With our bespoke, dedicated IT services, your business is able to offload IT burdens based on its specific needs — be it end user IT support, infrastructure management, system monitoring, or the entire IT environment.
                        `
                    },
                    {
                        title: "Infrastructure Consulting",
                        subtitle: "On-Demand IT Special Forces",
                        link: "/consulting",
                        text: `Many organizations have business requirements that demand the use of complex IT technologies, but not all of them can afford to keep engineers with the necessary skillsets on staff at all times.
                        
                        That's where we come in — our ridiculously talented infrastructure engineers are dangerously good at designing, building, and implementing complex IT systems when the need arises. 
                        `
                    }
                ]
            }
        },
        docs: {
            includeNext: false,
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
    newNav: {
        left: [
            {
                title: "Platform",
                link: "/cloud"
            },
            {
                title: "Services",
                link: "/services"
            },
            {
                title: "Consulting",
                link: "/consulting"
            }
        ],
        right: [{ title: "About", link: "/about" }, { title: "Docs", link: "/docs" }]
    },
    footer: {
        sections: [
            {
                title: "Company",
                items: [
                    { name: "Home", link: "/" },
                    { name: "About", link: "/about" },
                    { name: "Careers", link: "/about" },
                    { name: "Channel", link: "/channel" }
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

const pagesArray = () => {
    let pa = [];
    for (let k in site.pages) {
        pa.push(site.pages[k]);
    }
    return pa;
};

site.pagesArray = pagesArray();

export {
    homeConfig,
    footerConfig,
    siteConfig,
    navConfig,
    contactFormConfig,
    locationConfig,
    pageConfig
};
export default site;
