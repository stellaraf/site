/* eslint-disable max-len */
import theme from "styles/exports.module.scss";

const commonNavItems = [
    {
        title: "Cloud",
        items: [
            { name: "Infrastructure as a Service", link: "/cloud#iaas" },
            { name: "Data Protection", link: "/cloud#backups" },
            { name: "Virtual Desktop Infrastructure", link: "/cloud#vdi" }
        ]
    },
    {
        title: "Dedicated IT",
        items: [
            { name: "Help Desk as a Service", link: "/services" },
            { name: "Managed Infrastructure", link: "/services" }
        ]
    },
    {
        title: "Design & Deployment",
        items: [
            { name: "Systems Engineering", link: "/consulting" },
            { name: "Network Architecture", link: "/consulting" },
            { name: "DevOps & Automation", link: "/consulting" }
        ]
    }
];

const defaultTags = [
    "stellar",
    "stellar cloud",
    "stellar technologies",
    "stellar technologies inc",
    "cloud",
    "technology",
    "networking",
    "storage",
    "servers"
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
        // { name: "Facebook", link: "https://www.facebook.com/stellar_tech" },
        { name: "LinkedIn", link: "https://linkedin.com/company/stellaraf" },
        { name: "Github", link: "https://github.com/stellaraf" },
        { name: "Twitter", link: "https://twitter.com/stellartechinc" }
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
            subtitle: "We're glad you asked...",
            profile: {
                heading:
                    "Our mission is to make migrating to the cloud easier for enterprises than ever before.",
                text: `The cloud isn't just for people with massive development teams that can re-architect enterprise apps to make moving to a big name public cloud cost-effective. At Stellar, we want to bring the power of cloud computing to everyone, and help our customers worry less about IT infrastructure.`
            },
            leadership: [
                {
                    name: "Wayne Johnson",
                    title: "CEO",
                    bio:
                        "As a do-it-all engineer with over 10+ years of IT battlefield experience, Wayne started Stellar in 2014 with the vision of offering superior IT customer service while being a trusted partner to organizations of any size. With his recent transition into the role of CEO of Stellar, and with the help of his prior experience as CTO, he's leveraging his unparalleled expertise to direct Stellar into the one of the best Cloud & IT services companies in the world.",
                    photo: "exec-wjohnson.jpg",
                    social: [{ name: "LinkedIn", link: "https://linkedin.com/in/wwjohnson" }]
                },
                {
                    name: "Matt Love",
                    title: "Head of Infrastructure",
                    bio:
                        "A career-long network engineer, Matt came to Stellar to build bigger and badder networks. He's since picked up new skills in front-end and back-end development, and now leads both the cloud infrastructure & development teams at Stellar.",
                    photo: "exec-mlove.jpg",
                    social: [
                        { name: "LinkedIn", link: "https://linkedin.com/in/matt-love" },
                        { name: "Github", link: "https://github.com/checktheroads" }
                    ]
                },
                {
                    name: "Dave Barrett",
                    title: "Principal Engineer",
                    bio:
                        "With decades of experience in IT, Dave came to Stellar eager to help more customers migrate to the cloud. After joining the cloud infrastructure team, he is now senior-most engineer in the company and oversees the company's technical operations.",
                    photo: "exec-dbarrett.jpg",
                    social: [
                        { name: "LinkedIn", link: "https://linkedin.com/in/dave-barrett-a634a3a1" }
                    ]
                }
            ],
            tags: ["wayne johnson", "matt love", "dave barrett", "management", "mission", "social"]
        },
        contact: {
            includeNext: false,
            link: "/contact",
            title: "Talk to Us",
            subtitle: "We'd love to talk to you!",
            sections: {
                support: {
                    title: "Need Help?",
                    subtitle: "Already a Stellar customer? Let us know how we can help!",
                    text: ``
                },
                contactForm: {
                    title: "Interested in Learning More?",
                    subtitle: "Tell us how to reach you and we'll contact you as soon as possible."
                }
            },
            tags: [
                "contact",
                "phone number",
                "support",
                "help desk",
                "sales",
                "contact",
                "help",
                "assistance",
                "information",
                ...defaultTags
            ]
        },
        cloud: {
            includeNext: true,
            nextLead: "Gravitate to the upper echelon of cloud",
            link: "/cloud",
            title: "Orion",
            subtitle: "The Enterprise Native Cloud",
            sections: {
                one: {
                    title: "Your applications, orbiting your workforce",
                    text:
                        "Our strategically located data centers allow enterprises to substantially reduce latency between end-users and business applications."
                },
                info: [
                    {
                        title: "100% Uptime Guarantee",
                        subtitle: "Time is money & talk is cheap",
                        text: `We're _that_ confident in the Orion platform. If we fail to deliver on our <Link href="https://docs.stellar.tech/docs/resources/sla">Service Level Agreement</Link>, we'll credit back the amount of time services were unavailable.`
                    },
                    {
                        title: "Infrastructure as a Service",
                        subtitle: "Your Virtual Private Data Center at the Highest Altitude",
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
                                title: "Security",
                                text: `Keeping invaders away from your cloud resources is critically important. With the Orion premium next-generation firewall service powered by <PaloAltoNetworks color={${theme.stWhite}} height={40} /> your cloud resources can take advantage of full application layer visibility and control, known and unknown threat prevention, malware prevention, and inbound and outbound SSL decryption.`
                            }
                        ]
                    },
                    {
                        title: "Data Protection",
                        subtitle: "We've got you covered",
                        content: [
                            {
                                title: "Backups as a Service",
                                text: `At Stellar, one of the core components to our engineering culture is the concept notion that backups are Priority 1. Having a comprehensive data protection strategy that properly safeguards critical business data is literally _the_ most important objective a technology-driven organization can have.<br/><br/>
                                With the power of the Orion cloud platform, we offer one of the most robust, customizable, and _fastest_ backup platforms in the world, powered by <Veeam className="inline-icon" height={12} color={${theme.stWhite}}/>.
                                With our atomically low RPOs & RTOs, enterprises can rest assured that their critical data is not only protected, but easily recoverable when diaster strikes.`
                            },
                            {
                                title: "Disaster Recovery as a Service",
                                text: `Disaster recovery takes data protection beyond basic file recovery. With Orion's DRaaS platform, our team of data protection engineers can restore your entire IT infrastructure environment in minutes, should an inevitable disaster occur.`
                            }
                        ],
                        infoPopup: {
                            title: "Ever wondered about the difference between backups & DR?",
                            text: `Let's clear it up!<br/><br/>
                            **Backups**: Snapshots of raw data, like files, moved off of your primary servers so that it can be recovered in the event that the data is lost due to accidental deletion, sudden hardware failure, etc.<br/><br/>
                            **Disaster Recovery**: Constant replication of production server _state_ to an offsite location, so that applications can be brought online at a moment's notice with minimal data loss. A disaster recovery strategy is a wholistic plan of action centered around how a business is to technologically operate in the event of a major disaster.`
                        }
                    },
                    {
                        title: "Virtual Desktop Infrastructure",
                        subtitle: "The smart, secure way to never deal with PCs again",
                        content: [
                            {
                                title: "High Performance Desktops for Everyone",
                                text: `With Orion VDI, end users can take full advantage of our blazing fast platform in their every day workloads, while you focus on adding value to your business instead of worrying about which PCs need upgrading this year.<br/><br/>
                                    Upgrading a user's CPU, RAM, or disk space is just ten seconds of your time, and user workflows never miss a beat!`
                            },
                            {
                                title: "Truly Secure Mobile Workforce",
                                text: `Worried about your mobile users getting compromised while getting their work done at a coffee shop? With VDI, user desktops never leave your secure cloud perimeter, so there's no need to worry about disk encryption, man-in-the-middle attacks, or data loss.`
                            }
                        ]
                    },
                    {
                        title: "Network Connectivity",
                        subtitle: "Travel on your Cloud Journey at the Speed of Light",
                        content: [
                            {
                                title: "Backbone",
                                text: `Behind the Orion platform is our transcontinental & transpacific core network. Each of our strategically located data centers is redundantly interconnected with the rest of the Orion ecosystem via 10 Gbps transport paths, ensuring always-on availability and uncompromising speed.`
                            },
                            {
                                title: "Upstream Interconnection",
                                text: `We're as choosy with our transit carriers as we are with our CPUs — this means we only partner with the best Tier 1 carriers, and leverage local peering whenever possible to guarantee the lowest latency to Orion for our end users.`
                            },
                            {
                                title: "Features",
                                text: `Our internet services come fully loaded with cutting edge technologies and IP transit features:`
                            },
                            {
                                title: "Private Extensions",
                                text: `To make sure Orion is a true extension of the enterprise, we support private connectivity of virtually any type. Whether it's an MPLS circuit from your existing global carrier, a metro ethernet link, or your own physical VPN endpoint, we'll make it happen.<br/><br/>
                                To simplify connectivity even further, we offer a premium SD-WAN cloud extension service which can automatically combine any existing bandwidth mediums with per-packet load balancing, perform end-to-end QoS prioritization, and guarantee always-on cloud connectivity.`
                            }
                        ]
                    }
                ]
            },
            tags: [
                "orion",
                "high performance compute",
                "vmware",
                "cloud",
                "iaas",
                "vdiaas",
                "baas",
                "draas",
                "vdi",
                "virtual desktop",
                "backups",
                "disaster recovery",
                "cloud storage",
                "sla",
                "ipv6",
                "hawaii",
                "island",
                "compute",
                "api",
                "vcloud",
                ...defaultTags
            ]
        },
        services: {
            includeNext: true,
            nextLead: "Make our stellar engineers your Stellar IT Team",
            link: "/services",
            title: "Dedicated IT Services",
            subtitle: "Your 24/7 Technology Team",
            sections: [
                {
                    title: "Help Desk as a Service",
                    subtitle: "Consistent, always available & professional support",
                    content: [
                        {
                            title: "Proactive & Reactive Support",
                            text: `Our stellar service desk team can seamlessly become your in-house IT team, directly supporting your users. From day one of your stellar experience, our team continuously monitors, discovers, and documents your entire IT environment, so there's always stunning clarity about how your systems are running.`
                        },
                        {
                            title: "Technology Optimization",
                            text: `Our remote monitoring and management tools bring visibility, control, and automation in your IT environment to a new level. With our advanced system tooling, workstations and servers are automatically patched on your terms and your custom stack of applications are automatically deployed and kept up to date.`
                        }
                    ]
                },
                {
                    title: "Managed Infrastructure",
                    subtitle: "Let our experts manage your servers and network devices for you",
                    content: [
                        {
                            title: "Trusted Advisors",
                            text: `As your trusted technology advisor, we come alongside your business and help direct the velocity of technology in the organization. Because we're constantly in tune with the digital landscape, we always know when it's time to evaluate new technologies.<br/><br/>
                            Our infrastructure team has extensive experience with complex Active Directory environments, Windows Server, Microsoft Exchange, Linux, every hypervisor under the sun, advanced networking & routing, and network security. By leveraging our stellar team of engineers, you can guarantee the right infrastructure is in place for your business needs _and_ ensure it always runs smoothly.`
                        },
                        {
                            title: "24x7 Performance & Uptime Monitoring",
                            text: `Our advanced monitoring tools work around the clock to ensure critical server and network elements are not only online, but not at risk of degradation. We continuously capture and analyze CPU, RAM, disk, and network utilzation and automatically create tickets for our engineers to investigate when performance deviations occur.`
                        }
                    ]
                }
            ],
            tags: [
                "managed services",
                "help desk",
                "24/7",
                "24x7",
                "infrastructure",
                ...defaultTags
            ]
        },
        consulting: {
            includeNext: true,
            nextLead: "Burst to our supreme infrastructure team",
            link: "/consulting",
            title: "Infrastructure Consulting",
            subtitle: "On-Demand IT Special Forces",
            sections: [
                { title: "Systems Engineering", subtitle: "" },
                { title: "Networking Architecture", subtitle: "" },
                { title: "DevOps & Infrastructure App Development", subtitle: "" }
            ],
            tags: [
                "vmware",
                "cisco",
                "hpe",
                "extreme",
                "pure storage",
                "ipv6",
                "bgp",
                "active directory",
                "exchange",
                "microsoft",
                "virtual",
                "consulting",
                "professional services",
                ...defaultTags
            ]
        },
        home: {
            includeNext: false,
            link: "/home",
            title: "Home",
            headings: {
                title: "Introducing...",
                subtitle: "",
                text: "Fueling your digital velocity"
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
            },
            tags: defaultTags
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
    locations: {
        phx01: {
            name: "Phoenix, AZ",
            subtitle: "",
            // info: "But it's a dry data center."
            info: "Our flagship, in the lowest risk climate."
        },

        hnl01: {
            name: "Honolulu, HI",
            subtitle: "",
            // info: "The data center you definitely need to audit."
            info: "The fastest cloud on the island."
        },

        chi01: {
            name: "Chicago, IL",
            subtitle: "",
            // info: "The windiest data center."
            info: "Bringing the enterprise-native cloud to the heart of the midwest."
        },
        atl01: {
            name: "Atlanta, GA",
            subtitle: "On the 2020 Horizon",
            // info: "It may be hot outside, but not in this data center."
            info: "Coming soon!"
        },
        sac01: {
            name: "Sacramento, CA",
            subtitle: "On the 2020 Horizon",
            // info: "The cloud's most hipster data center."
            info: "Coming soon!"
        }
    },
    // {
    //     id: "pdx01",
    //     name: "Portland, OR",
    //     subtitle: "On the 2020 Horizon",
    //     info: "Put a bird on your data center."
    // }
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
                title: "Cloud",
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
        right: [
            { title: "About", link: "/about" }
            // { title: "Docs", link: "https://docs.oscloud.io" }
        ]
    },
    footer: {
        sections: [
            {
                title: "Company",
                items: [
                    { name: "Home", link: "/" },
                    { name: "About", link: "/about" },
                    { name: "Careers", link: "/" }
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

const pagesArray = () => {
    let pa = [];
    for (let k in site.pages) {
        pa.push(site.pages[k]);
    }
    return pa;
};

site.pagesArray = pagesArray();

export default site;
