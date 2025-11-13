import { Metadata } from "next";

const TITLE = "Showcase - Explore creative portfolios now!";
const DESCRIPTION = "Showcase is the creative portfolio hub where makers upload their work and teams hire fast.";

const BASE_URL = "https://showcase.innpae.com";


export const siteConfig: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    icons: {
        icon: "/favicon.ico",
    },
    applicationName: TITLE,
    openGraph: {
        type: "website",
        locale: "en_IE",
        url: BASE_URL,
        title: TITLE,
        description: DESCRIPTION,
        images: [
            {
                url: "/image.png",
                width: 1200,
                height: 630,
                alt: TITLE,
            },
        ],
    },
    category: "Business",
    alternates: {
        canonical: BASE_URL,
    },
    twitter: {
        creator: "@kunlgrg",
        title: TITLE,
        description: DESCRIPTION,
        card: 'summary_large_image',
        images: [
            {
                url: "/image.png",
                width: 1200,
                height: 630,
            },
        ],
    },
    keywords: [
        "portfolio",
        "creative portfolio",
        "hire creatives",
        "design showcase",
        "developer showcase",
        "portfolio directory",
        "creative marketplace",
        "design hiring",
        "talent discovery",
        "freelance portfolio",
    ],
    metadataBase: new URL(BASE_URL),
};