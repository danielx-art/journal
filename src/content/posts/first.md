---
title: "Introducing My Dev Journal"
date: 2025-08-27
lang: "en"
translationOf: "primeiro"
description: "Why I built this dev journal, how I built it (Astro + Tailwind + React), the problems I hit, and what's next."
tags: ["meta","astro","tailwind","react","i18n","devjournal"]
---

Hello — I’m Daniel. This site is my dev journal: a small project I built to document experiments, projects, and notes I want to share
— and to show how I think and build. I’m linking this journal from my portfolio as an ongoing project I work on while I ship
other things.

Why a dev journal?
- It forces me to explain my decisions and keep a log of approaches that actually worked.
- It’s a living portfolio entry: you see code, demos, tradeoffs and the fixes I found along the way.
- It’s useful for others: I often learn more when I teach or document.

What this site does (short tour)
- Multilingual content (English / Portuguese) using content collections and a simple `lang` frontmatter field.
- Clean, natural permalinks: `/en/posts/astro-setup` and `/br/posts/configurando-astro`.
- Theme toggle (light / dark) implemented as a small client component; theme is persisted in localStorage.
- Search in the navbar (client side, fuzzy search) to find posts quickly.
- Pagination and sorting on the language homepages.
- SEO basics: per‑page meta tags, canonical links, and hreflang alternate links.
- Planned: MDX with interactive React islands (for demos), math rendering, and server‑side syntax highlighting.

Tech choices and why
- Astro — best for content sites: static output by default, content collections, and islands architecture for client interactivity.
- Tailwind v4 — fast utility CSS and `@theme` tokens for CSS variable‑driven theming.
- React (small islands) — used for interactive pieces that need client state: Nav menu, theme toggle, search, and the posts list that handles client sorting/pagination with ClientRouter.
- Fuse.js (client) — fuzzy search for small index, loaded lazily for performance.
- KaTeX + rehype/remark plugins (future) — for LaTeX math in posts.
- rehype/shiki (future) — server side code highlighting for beautiful code blocks.

Problems I hit (and how I fixed them)
- Slug naming: At first I had filename suffixes like `astro-setup.en.md` → Astro created slugs with `en` appended. I solved it by naming files naturally per language (e.g. `astro-setup.md` / `configurando-astro.md`) and using a `translationOf` frontmatter to link the two.
- Encoding / accents: Portuguese characters rendered as `Ã©`. The fix was to ensure `<meta charset="utf-8">` existed in my custom layout (I had overridden the default and missed it).
- Rendering Markdown body: initially tried `innerHTML`, but Astro uses `set:html` and the Content renderer (`const { Content } = await post.render(); <Content />`) — this is the recommended approach, especially when using MDX.
- Theme flash (FOUC): after toggling theme, the site briefly flashed the wrong theme. Solution: inline script in `<head>` to set `data-theme` from localStorage before CSS paints, and keep the theme toggle as a persistent client component (rehydrated as an island).
- ClientRouter lifecycle: enabling `<ClientRouter />` (to get view transitions and SPA feel) meant some inline scripts didn’t re-run after navigation. I addressed this by moving sorting/pagination/search into client components (React islands) and by listening to Astro lifecycle events (e.g. `astro:page-load`) when needed. I also used `transition:persist` for components whose state should survive navigations.
- Translation lookup: I initially compared `translationOf` to `translationOf` and got wrong matches. The correct lookup is `posts.find(p => p.slug === post.data.translationOf && p.data.lang !== lang)`.

Accessibility & small details I cared about
- Sort toggle is a single button (not two links) with `aria-pressed` and an `s` keyboard shortcut.
- Pagination preserves layout (use `visibility: hidden` not `display: none`) to avoid shift when prev/next disappear.
- Search uses a combobox pattern (role attributes) and keyboard navigation (↑/↓/Enter/Esc).
- Hreflang links and canonical tags are generated per page for proper international SEO.

What I’d like to add next
- MDX support: embed React canvas demos, include KaTeX for math, pre‑render server side code highlighting (Shiki/rehype‑pretty‑code).
- Auto‑generated OG images for social sharing (Vercel OG or build‑time generator).
- Tag pages and a simple “related posts” recommendation box.
- RSS feed and deployment to GitHub Pages (I’ll write a short deployment guide next).

If you’re curious about specifics
- I can show the theme toggle, the NavMenu (search + language switch), or a code sample of how an MDX file embeds a React island.
- If you want to reproduce this locally, run the site with `npm run dev` (after installing the project dependencies); I can add a local README scaffold if you like.

Thanks for stopping by — this journal will be the working log of projects I build and lessons I learn.  
If you read something useful, tell me — I’d love feedback or ideas for next posts.

— Daniel