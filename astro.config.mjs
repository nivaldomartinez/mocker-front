import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from '@astrojs/node';
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  base: '/',
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    host: '0.0.0.0'
  },
  integrations: [react(), tailwind(), partytown()]
});