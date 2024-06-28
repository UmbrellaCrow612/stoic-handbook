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
      </>
    );
  },
};

export default config;
