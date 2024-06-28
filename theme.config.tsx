import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: <span>Stoic Handbook</span>,
  project: {
    link: "https://github.com/UmbrellaCrow612/stoic-handbook",
  },
  docsRepositoryBase:
    "https://github.com/UmbrellaCrow612/stoic-handbook/tree/main",
  footer: {
    text: "Nextra Docs Template",
  },
  sidebar: {
    toggleButton: true,
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s - Stoic Handbook",
      };
    }
  },
  head: () => {
    const { asPath } = useRouter();
    const { frontMatter, title } = useConfig();

    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    const socialCard = `${origin}/api/og?title=${title}`;

    const URL = `${origin}${asPath}`;

    return (
      <>
        <meta property="og:url" content={URL} />
        <meta
          property="og:title"
          content={frontMatter.title || "Stoic Handbook"}
        />
        <meta
          property="og:description"
          content={
            frontMatter.description ||
            "Stoic Handbook learn everything you need to know about Stoicism"
          }
        />
        <meta name="og:image" content={socialCard} />
        <meta name="twitter:image" content={socialCard} />

        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={
            frontMatter.description ||
            "Stoic Handbook learn everything you need to know about Stoicism"
          }
        />
        <meta
          name="og:description"
          content={
            frontMatter.description ||
            "Stoic Handbook learn everything you need to know about Stoicism"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content={origin} />
        <meta name="twitter:url" content={URL} />
        <meta
          name="og:title"
          content={title ? title + " - Stoic Handbook" : "Stoic Handbook"}
        />
        <meta name="apple-mobile-web-app-title" content="Stoic Handbook" />
        
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
      </>
    );
  },
};

export default config;
