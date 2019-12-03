import React from "react";
import { Helmet } from "react-helmet";
import site from "config";
import useURL from "hooks/useURL";

const createPath = (host, loc) => `${host.protocol}//${host.host}${loc}`;

export default function MetaTags({ page }) {
    const [host] = useURL();
    return (
        <Helmet>
            <meta name="title" content={site.pages[page].title} />
            <meta
                name="description"
                content={site.pages[page].description || site.global.description}
            />
            <meta name="keywords" content={site.pages[page].tags} />
            <link rel="canonical" href={createPath(host, site.pages[page].link)} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@StellarTechInc" />
            <meta name="twitter:title" content={site.pages[page].title} />
            <meta name="twitter:description" content={site.pages[page].subtitle} />
            <meta name="twitter:image" content={createPath(host, "/opengraph.png")} />
            <meta name="og:title" content={site.pages[page].title} />
            <meta name="og:description" content={site.pages[page].subtitle} />
            <meta name="og:url" content={createPath(host, site.pages[page].link)} />
            <meta name="og:image" content={createPath(host, "/opengraph.png")} />
        </Helmet>
    );
}
