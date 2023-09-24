import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import sanity from "@sanity/astro";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: `${import.meta.env.VITE_WEBSITE_URL}`,
  vite: {
    ssr: {
      noExternal: [
        "path-to-regexp",
        "@sanity/client",
        "@sanity/image-url",
        "@portabletext/toolkit",
      ],
    },
  },
  server: {
    port: 8080,
    host: true,
  },
  integrations: [
    sanity({
      projectId: `${import.meta.env.VITE_PROJECT_ID}`,
      dataset: `${import.meta.env.VITE_DATASET}`,
      useCdn: true,
    }),
    sitemap(),
  ],
  output: "server",
  adapter: netlify(),
});
