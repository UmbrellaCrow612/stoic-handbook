import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Stoic Handbook</span>,
  project: {
    link: "https://github.com/UmbrellaCrow612/stoic-handbook",
  },
  docsRepositoryBase: "https://github.com/UmbrellaCrow612/stoic-handbook/tree/main",
  footer: {
    text: "Nextra Docs Template",
  },
  sidebar: {
    toggleButton: true,
  },
};

export default config;
