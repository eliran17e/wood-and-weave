# Wood and Weave / עץ ובד

Storefront for a factory-direct, made-to-order upholstered furniture shop.
Bilingual English + Hebrew with full RTL support.

## Stack

- React 18 + React Router 6
- Vite 5
- Tailwind CSS 3
- `sharp` for the photo-optimisation script
- `lucide-react` for icons

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

## Production build

```bash
npm run build        # → dist/
npm run preview      # preview the dist/ build at localhost:4173
```

## Photo optimisation

When new product photos come in (jpg/jpeg/png), drop them into the right
`public/shop_photos/<category>/` folder named `NNN.jpg` (next sequential
number) and run:

```bash
npm run optimize -- --clean
```

This converts each photo to webp at max 1600 px wide, then deletes the
originals. Saves ~50% on file size.

## Deploy

`vercel.json` is included for SPA routing. Connect the repo to Vercel and
it auto-deploys every push to `main`.

## Adding products / changing copy

See [`WORKFLOW.md`](./WORKFLOW.md) — every common task documented with the
exact files to touch.

## Project map

```
src/
├── App.jsx                    Router
├── main.jsx                   Entry + LanguageProvider
├── i18n.jsx                   EN + HE translations, RTL handling
├── config.js                  Phone + WhatsApp constants
├── data/products.js           Catalog (categories, names, OVERRIDES map)
├── pages/                     Home, ProductListing, ProductDetail
└── components/                Navbar, Footer, ProductCard, LanguageToggle

public/
├── logos/                     Site icons (favicon, navbar, footer)
└── shop_photos/
    ├── fabrics/               Fabric library shown on PDPs
    ├── logos/                 Source logo files (designer originals)
    └── <category>/            Product photos, NNN.webp
```
