import React from "react";
import { Helmet } from "react-helmet";
import twitterImg from "./assets/images/logo.png";

export const SeoMeta = ({ data }) => {
    const title = data.title;
    const description = data.description;
    const image = twitterImg;
    const canonical = `https://www.your-homepage.com/${data.canonical}`;
    const type = data.type === undefined ? "website" : data.type;
    const width = image && (data.width || 1200);
    const height = image && (data.height || 630);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {canonical ? <link rel="canonical" href={canonical} /> : null}
            {image ? <link rel="image_src" href={image} /> : null}
            {image ? <meta itemprop="image" content={image} /> : null}

            <meta property="og:site_name" content="YOUR WEB SITE" />
            <meta property="og:title" content={title} />
            {description ? (
                <meta property="og:description" content={description} />
            ) : null}
            {canonical ? <meta property="og:url" content={canonical} /> : null}
            <meta property="og:type" content={type} />
            {image ? <meta property="og:image" content={image} /> : null}
            {width ? <meta property="og:image:width" content={width} /> : null}
            {height ? (
                <meta property="og:image:height" content={height} />
            ) : null}
            <meta property="fb:pages" content="트위터클론" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description ? (
                <meta name="twitter:description" content={description} />
            ) : null}
            {image ? <meta name="twitter:image" content={image} /> : null}
            <meta name="twitter:site" content="트위터클론" />
            {canonical ? (
                <link rel="alternate" href={data.canonical} hreflang="ko" />
            ) : null}
        </Helmet>
    );
};
