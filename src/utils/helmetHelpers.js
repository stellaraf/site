import React from "react";
import { Helmet } from "react-helmet";
import site from "config";

const TwitterMeta = ({ page }) => (
    <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@StellarTechInc" />
        <meta name="twitter:title" content={site.pages[page].title} />
        <meta name="twitter:description" content={site.pages[page].subtitle} />
        <meta name="twitter:image" content="/opengraph.png" />
    </Helmet>
);

const OpenGraphMeta = ({ page }) => (
    <Helmet>
        <meta name="og:title" content={site.pages[page].title} />
        <meta name="og:description" content={site.pages[page].subtitle} />
        <meta name="og:url" content={`https://stellar.tech/${page}`} />
        <meta name="og:image" content="https://stellar.tech/opengraph.png" />
    </Helmet>
);

export { TwitterMeta, OpenGraphMeta };
