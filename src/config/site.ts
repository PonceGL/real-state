import type { Metadata } from "next";

type SiteConfig = {
  name: string;
  description: string;
  url: string;
  logoUrl: string;
  ogImage: string;
  author: string;
  links: {
    facebook: string;
    instagram?: string;
  };
  contact: {
    address: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
    phone: string;
    email: string;
  };
  openingHours: {
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
};

export const siteConfig: SiteConfig = {
  name: "Constructora e Inmobiliaria Vasquez",
  description:
    "Constructora e Inmobiliaria Vasquez, más de 25 años de no solo hacer y vender propiedades, sino de cumplir sueños.",
  url: "https://www.inmobiliariavasquez.mx",
  ogImage: "https://www.inmobiliariavasquez.mx/og-image.jpg", //TODO: change this
  logoUrl: "https://www.inmobiliariavasquez.mx/logo-image.jpg", //TODO: change this
  author: "Inmobiliaria Vasquez",
  links: {
    facebook: "https://www.facebook.com/inmobvasquez",
  },
  contact: {
    address:
      "Margarita Olivo Lara #15 Col. Rafael Lucio, C.P. 91110, Xalapa, Veracruz, México.",
    addressRegion: "MEX",
    postalCode: "91110",
    addressCountry: "MX",
    phone: "+522282107188",
    email: "civsa@grupovasquez.com.mx",
  },
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:30",
    },
    {
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,

  authors: [{ name: siteConfig.author, url: siteConfig.url }],

  creator: siteConfig.author,

  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `Logo de ${siteConfig.name}`,
      },
    ],
    locale: "es_MX",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  manifest: "/site.webmanifest",
};
