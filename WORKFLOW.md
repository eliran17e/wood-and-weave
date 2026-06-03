# Catalog workflow

The site has no admin UI. All product data lives in code, in two places:

- **Photos** → `public/shop_photos/<category>/NNN.webp`
- **Names, prices, descriptions, sizes** → `src/data/products.js`

Every change is a code edit + git commit. Push to `main` and Vercel
auto-redeploys in ~90 seconds.

---

## Common tasks

### 1. Add a new product in an existing category (~3 minutes)

Example: a new sofa.

```bash
# Drop the new photo into the right folder.
# It can be jpg/jpeg/png — the optimize script converts it.
# Use the next sequential number.
cp ~/Downloads/new-sofa.jpg \
   public/shop_photos/living-room-sets/058.jpg

# Convert + compress to webp, delete the original
npm run optimize -- --clean
```

In `src/data/products.js`, bump the `count` for that category:

```diff
  {
    key: 'living-room-sets',
-   count: 57,
+   count: 58,
    ...
  },
```

Commit, push. Done. The new product appears at `/product/living-room-sets-058`
with the next name from the names pool, the category default price, and the
new photo.

### 2. Give one product a custom name or price (~2 minutes)

Edit the `OVERRIDES` map at the top of `src/data/products.js`:

```js
const OVERRIDES = {
  'living-room-sets-015': {
    price: 4500,
    en: { name: 'The Hadassah', description: 'A signature piece.' },
    he: { name: 'הדסה', description: 'דגם ייחודי.' },
  },
  'beds-007': {
    price: 2490,
  },
};
```

Anything you don't list falls back to the category default.
Commit, push.

### 3. Fix a typo or change category-wide copy (~1 minute)

- **Product descriptions, default prices, sizes** → edit the relevant entry in `CATEGORIES` in `src/data/products.js`
- **Headings, kickers, blurbs, navbar labels, taglines** → edit `src/i18n.jsx` (both `en:` and `he:` sections)
- **Contact phone / WhatsApp** → edit `src/config.js`

### 4. Add a completely new category (~30 minutes)

Example: wardrobes.

1. Create `public/shop_photos/wardrobes/` and add photos (NNN.jpg → run `npm run optimize -- --clean`)
2. In `src/data/products.js` → add a new entry to the `CATEGORIES` array (copy an existing one and adapt)
3. In `src/data/products.js` → add a names pool to `NAMES`
4. In `src/i18n.jsx` → add for both `en:` and `he:`:
   - `nav.wardrobes`
   - `plp.kicker.wardrobes`, `plp.title.wardrobes`, `plp.blurb.wardrobes`
5. In `src/App.jsx` → add a `<Route path="/wardrobes" element={<ProductListing category="wardrobes" />} />`
6. In `src/components/Navbar.jsx` → add `'wardrobes'` to the `CATEGORIES` array and to the inline-links list
7. In `src/components/Footer.jsx` → add `'wardrobes'` to `SHOP_CATEGORIES`
8. (Optional) In `src/pages/Home.jsx` → add a tile to the `BENTO` array

### 5. Replace the logo (~5 minutes)

1. Drop the new icon source into `public/shop_photos/logos/`
2. Re-run the inline node script that lives in the project notes to regenerate
   `public/logos/*.png` at all sizes — or ask the dev
3. Hard-refresh the browser to bust the favicon cache

---

## Local dev

```bash
npm install        # first time only
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build locally
```

## Deploy

Vercel auto-deploys every push to `main`. To trigger a manual redeploy:
- Push any commit (e.g. an empty commit: `git commit --allow-empty -m "redeploy"`)
- Or click "Redeploy" in the Vercel dashboard

---

## What lives where (mental model)

```
src/
├── App.jsx                    Router — list of all routes
├── main.jsx                   App entry, providers
├── i18n.jsx                   All UI text in EN + HE; language toggle logic
├── config.js                  Phone + WhatsApp constants
├── data/
│   └── products.js            Catalog (categories, names, prices, overrides)
├── pages/
│   ├── Home.jsx               Homepage
│   ├── ProductListing.jsx     Category pages (one per category)
│   └── ProductDetail.jsx      Single-product page
└── components/
    ├── Navbar.jsx
    ├── Footer.jsx
    ├── ProductCard.jsx
    └── LanguageToggle.jsx

public/
├── logos/                     Site icons (favicon, navbar, footer)
└── shop_photos/
    ├── fabrics/               Fabric library shown on PDPs
    ├── logos/                 Source logo files (designer originals)
    └── <category>/            Product photos, NNN.webp
```
