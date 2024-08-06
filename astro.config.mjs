import process from "node:process";

import starlight from "@astrojs/starlight";
import vercel from "@astrojs/vercel/serverless";

import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";

const VERCEL_PREVIEW_SITE =
  process.env.VERCEL_ENV !== "production" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
const site = VERCEL_PREVIEW_SITE ?? "https://mythicdrops.dev";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    starlight({
      title: "Veng Notes",
      logo: {
        src: "./src/assets/bear-demon-spikes.webp",
        alt: "Bear with Demon Spikes active",
      },
      editLink: {
        baseUrl:
          "https://github.com/ToppleTheNun/veng-notes/edit/main/src/content/docs/",
      },
      social: {
        github: "https://github.com/ToppleTheNun/veng-notes",
        discord: "https://discord.gg/felhammer",
      },
      sidebar: [
        {
          label: "Welcome",
          link: "/",
        },
        {
          label: "Vengeance",
          link: "/vengeance",
        },
        {
          label: "Hero Specs",
          autogenerate: {
            directory: "hero-specs",
          },
        },
      ],
    }),
  ],
  plugins: [starlightLinksValidator()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
