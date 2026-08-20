# Barbearia Arrumadinho

![Barbearia Arrumadinho](public/og-image.jpg)

**English** · [Português](README.pt-BR.md)

Marketing site and lightweight CMS for a barbershop and barber school in Colombo, Paraná, Brazil. Built as a freelance project for a real business — the client edits every section of the site from a private admin area, without a developer and without a redeploy.

🔗 **[www.barbeariaarrumadinho.com.br](https://www.barbeariaarrumadinho.com.br)**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firestore-12-FFCA28?logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)

---

## Why it exists

Local businesses usually get one of two things: a static site that goes stale because every text change needs a developer, or a heavyweight CMS that costs more to host than the site is worth.

This project takes a third path. The public site is a static SPA served from the edge, but every piece of content — carousel images, services, prices, products, courses, gallery — lives in Firestore and is edited through a purpose-built admin area. Publishing a change takes seconds and touches no code.

## Highlights

**Content is data, not markup.** All public sections read from Firestore. Adding a product or reordering services is a form submission, not a pull request.

**The admin never reaches the public.** The entire admin application sits behind a route-level dynamic import, and each section inside it is lazily loaded on top of that — 27 kB gzip that visitors who never open `/admin` never download. Firebase Auth is split into its own module for the same reason: the public pages only need Firestore, so the auth SDK stays out of their bundle entirely. That splitting, plus pruning unused design-token dependencies, cut the public bundle by a third.

**Repeat visits render before the network answers.** Public content is cached in `localStorage` and served as React's initial state, then revalidated in the background — stale-while-revalidate. Previously every section mounted empty and waited on a strictly serial chain: download and parse the Firestore SDK, initialize App Check, resolve a reCAPTCHA token, and only then query. None of that blocks the first paint any more.

**Navigation costs a route chunk, not a page load.** Header and footer links were plain anchors, so every internal click discarded the SPA and re-executed React, Firebase, App Check and reCAPTCHA from scratch. They now go through the router, and each route chunk is prefetched on hover, focus or touch — so the chunk has usually arrived before the click does.

**Images are sized per viewport.** Uploads go to Cloudinary; delivery URLs carry `f_auto,q_auto` plus a `srcset` of candidate widths and a `sizes` expression derived from each grid's real measurements. A 390 px phone stops downloading the 1200 px variant built for desktop. The LCP image is preloaded from the HTML rather than discovered after the bundle parses, and the carousel's second photo is deferred until shortly before it is shown.

**Structured data rendered statically.** The `BarberShop` JSON-LD graph lives directly in `index.html` rather than being injected by React, so crawlers that don't execute JavaScript still read the business's address, hours, phone, and geolocation. Other pages reference that node by `@id` instead of redeclaring the business.

**A single source of truth for business data.** Name, address, phone, hours, and geolocation are defined once in `src/config/site.js` and consumed by the UI, the JSON-LD, and the WhatsApp deep links. NAP consistency is a direct local-SEO signal, and divergence between site and directory listings is one of the most common causes of a weak local pack.

## Performance

Measured before and after, on the production build:

| | Before | After | |
|---|---|---|---|
| Static assets in `public/` | 35.8 MB | 1.1 MB | **-97%** |
| Hero on load, 390 px phone at DPR 2 | 316.9 kB | 130.3 kB | **-59%** |
| Hero on load, 390 px phone at DPR 1 | 316.9 kB | 67.8 kB | **-79%** |
| Internal navigation to `/cursos` | 244.5 kB | 7.2 kB | **-97%** |
| Firestore latency before first paint, repeat visit | 397-474 ms | 0 ms | |

Where the numbers come from: transfer sizes are gzip figures from the production build and from the real Cloudinary delivery URLs at each candidate width; the latency figures are round-trips measured against the Firestore REST endpoint. They are transfer and latency measurements, not Lighthouse scores.

Two of them deserve their context. The `public/` reduction was dead weight, not compression — 31 image files left over from before the migration to Cloudinary, still deployed on every build because nothing had removed them. And the navigation figure describes a cold cache: with a warm one the large assets were already local, but they were still parsed and executed on every single internal click, which is the cost that actually hurts on a mid-range phone.

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19, React Router 7 |
| Build | Vite 8 |
| Styling | CSS Modules, custom properties for theming |
| Data | Cloud Firestore |
| Auth | Firebase Authentication (Google provider) |
| Media | Cloudinary (unsigned browser uploads) |
| Hosting | Vercel |
| Linting | ESLint 10 |

## Architecture

```
Visitor ──▶ Vercel (static SPA)
              │
              ├──▶ Firestore ......... content (read-only for the public)
              └──▶ Cloudinary ........ images, transformed at delivery

Owner ────▶ /admin ──▶ Google sign-in ──▶ Firestore (writes)
                                    └──▶ Cloudinary (uploads)
```

There is no backend of our own. The site is static files plus two managed services, which keeps hosting cost at effectively zero for this traffic profile and removes a server from the maintenance surface.

## Getting started

**Requirements:** Node.js 20+ and npm.

```bash
git clone https://github.com/Ismaelthe10/arrumadinho.git
cd arrumadinho
npm install
# create a .env file in the project root — see Environment variables below
# fill in .env with your own Firebase and Cloudinary values
npm run dev
```

The app runs at `http://localhost:5173`.

You will need your own Firebase project (with Firestore enabled) and a Cloudinary account with an unsigned upload preset. The repository intentionally ships no credentials.

## Environment variables

Create a .env file in the project root. All variables are required.

| Variable | Purpose |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web app config |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Web app config |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Web app config |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Web app config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Web app config |
| `VITE_FIREBASE_APP_ID` | Firebase Web app config |
| `VITE_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key used by Firebase App Check |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary account identifier |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Name of the unsigned upload preset |

> **A note for whoever maintains this next.** Everything prefixed `VITE_` is inlined into the JavaScript bundle at build time and is therefore readable by anyone who visits the site. That is expected — these are public client identifiers, not secrets, and the platforms are designed around that assumption. It does mean that **no true secret may ever be added to this file.** An API secret, a service account key, or a private token belongs in a server-side environment, never in a `VITE_` variable.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project structure

```
src/
├── components/     Public site sections (Hero, Services, Products, FAQ, …)
├── pages/          Public routes (Home, Courses, About, legal pages, 404)
├── admin/          Admin application — lazily loaded, self-contained
│   ├── pages/      One editor per site section
│   ├── hooks/      Firestore list/array-document editing, Cloudinary upload
│   ├── components/ Layout, navigation, image upload field
│   └── context/    Auth state
├── hooks/          Stale-while-revalidate cache for public content
├── routes/         Lazy-route importers, shared with the prefetch-on-intent
├── infra/          Firebase initialization and the public-content fetchers
├── config/         Business data — single source of truth
├── content/        Static copy (FAQ)
├── utils/          Cloudinary URL and srcset builders, localStorage cache
└── styles/         Theme tokens

public/             Static assets, favicons, sitemap, robots.txt
```

## Content model

Public sections read from these Firestore collections:

| Path | Content |
|---|---|
| `hero/carousel` | Homepage carousel images |
| `mainServices` | Main service cards |
| `services/extra` | Additional services list |
| `products` | Product catalogue |
| `courses` | Course catalogue |
| `space/gallery` | Photo gallery of the space |

## Admin area

The site includes a private administrative area used by the business owner to manage the content above. Access requires authentication, and write permissions are enforced server-side rather than in the interface. Configuration details are kept out of this repository.

## Deployment

Deployed on Vercel. `vercel.json` rewrites all paths to `index.html` so client-side routing works on direct navigation and refresh. Environment variables are configured in the Vercel dashboard; pushes to `main` deploy automatically.

## License

This is commercial work produced for a client. The source is published for portfolio and reference purposes; it is not licensed for reuse or redistribution. Brand assets, photography, and business content belong to Barbearia Arrumadinho.

---

Built by [Ismael Monteiro](https://github.com/Ismaelthe10).
