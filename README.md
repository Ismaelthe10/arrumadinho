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

**The admin never reaches the public.** The entire admin application is behind a route-level dynamic import, and each section inside it is lazily loaded on top of that. Visitors who never open `/admin` never download a byte of it. Firebase Auth is split into its own module for the same reason — the public pages only need Firestore, so the auth SDK stays out of their bundle entirely.

**Public bundle reduced by 33%** through that splitting plus dependency pruning.

**Structured data rendered statically.** The `BarberShop` JSON-LD graph lives directly in `index.html` rather than being injected by React, so crawlers that don't execute JavaScript still read the business's address, hours, phone, and geolocation. Other pages reference that node by `@id` instead of redeclaring the business.

**Images optimized at delivery.** Uploads go to Cloudinary; delivery URLs are rewritten on the fly with `f_auto,q_auto` and an explicit width, so each viewport gets an appropriately sized image in a modern format. The LCP image is preloaded and prioritized; the rest lazy-load.

**A single source of truth for business data.** Name, address, phone, hours, and geolocation are defined once in `src/config/site.js` and consumed by the UI, the JSON-LD, and the WhatsApp deep links. NAP consistency is a direct local-SEO signal, and divergence between site and directory listings is one of the most common causes of a weak local pack.

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
├── infra/          Firebase initialization (Firestore and Auth kept separate)
├── config/         Business data — single source of truth
├── content/        Static copy (FAQ)
├── utils/          Cloudinary URL transformation
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
