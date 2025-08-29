// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import remarkMath from "remark-math";
import rehypeKatex from 'rehype-katex';


export default defineConfig({
  site: 'https://danielx-art.github.io',
  base: 'journal',
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  integrations: [mdx({remarkPlugins: [remarkMath], rehypePlugins:[rehypeKatex]}), react()]
});