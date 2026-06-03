// Single source of truth for the catalog.
//
// Products are auto-generated from the photos in public/shop_photos/<category>/
// using the per-category defaults (price, material, descriptions, size range)
// declared in CATEGORIES below. Each photo NNN.webp becomes one product with
// a name pulled from the NAMES pool.
//
// To add or change a product, see WORKFLOW.md at the repo root.

// ─────────────────────────────────────────────────────────────────────────────
// PER-PRODUCT OVERRIDES
// ─────────────────────────────────────────────────────────────────────────────
// Whenever a single product needs to differ from its category defaults — a
// custom name, a non-default price, a unique description — add it here keyed
// by slug. Anything you don't specify falls back to the category default.
//
// Examples:
//   'living-room-sets-015': {
//     price: 4500,
//     en: { name: 'The Hadassah', description: 'A signature piece — built on a single oak frame.' },
//     he: { name: 'הדסה', description: 'דגם ייחודי — שלד אלון אחיד.' },
//   },
//   'beds-007': {
//     price: 2490,
//   },
//   'chairs-022': {
//     en: { name: 'Studio Chair' },
//     he: { name: 'כיסא סטודיו' },
//   },
const OVERRIDES = {
  // Add per-product customisations here as your brother provides them.
};
// ─────────────────────────────────────────────────────────────────────────────

const NAMES = {
  'living-room-sets': [
    'Aalto', 'Cove', 'Drift', 'Fjord', 'Hara', 'Haven', 'Kasa', 'Linden',
    'Mist', 'Nordic', 'Plume', 'Quill', 'Saga', 'Søren', 'Thora', 'Vela',
    'Aspen', 'Brae', 'Cael', 'Dane', 'Edda', 'Finn', 'Greta', 'Halsted',
    'Iver', 'Juni', 'Kjell', 'Marek', 'Niva', 'Onyo', 'Pio', 'Renn',
    'Saoirse', 'Theo', 'Ulla', 'Wolla', 'Yara', 'Zima', 'Alva', 'Cleo',
    'Dahlia', 'Elin', 'Fia', 'Gita', 'Hilde', 'Indi', 'Klio', 'Maia',
    'Nia', 'Orla', 'Petra', 'Rina', 'Sera', 'Tova', 'Vesa', 'Wenna',
    'Yrsa',
  ],
  'beds': [
    'Stillwater', 'Hush', 'Nocturne', 'Lull', 'Reverie', 'Cradle', 'Cumulus',
    'Halcyon', 'Idyll', 'Serene', 'Solace', 'Tranquil', 'Slumber', 'Whisper',
    'Aurora', 'Eve', 'Nox', 'Stella', 'Luna', 'Solis', 'Aria', 'Cadence',
    'Lyric', 'Sonnet', 'Verse', 'Cantata', 'Hymn', 'Muse', 'Tide', 'Glen',
    'Hollow', 'Marsh', 'Vesper', 'Dawn', 'Dusk', 'Pause',
  ],
  'coffee-tables': [
    'Slate', 'Pebble', 'Lumen', 'Cairn', 'Flint', 'Onyx', 'Jasper', 'Quartz',
    'Basalt', 'Shale', 'Limestone', 'Travertine', 'Pumice', 'Obsidian',
    'Granite', 'Marble', 'Schist', 'Mica', 'Calcite', 'Agate', 'Geode',
    'Crystal', 'Stratum', 'Vein', 'Lode',
  ],
  'dining-tables': [
    'Oxford', 'Cambridge', 'Bryn', 'Larsen', 'Hadley', 'Tate', 'Bryant',
    'Ellington', 'Sterling', 'Whitman', 'Hawthorne', 'Whitley', 'Thornton',
    'Ashby', 'Carrington', 'Devon', 'Sussex', 'Wilton', 'Eton', 'Henley',
    'Camden', 'Kew', 'Mayfair', 'Belgravia', 'Chelsea', 'Knightsbridge',
    'Holland', 'Marylebone', 'Soho', 'Bloomsbury', 'Hampstead', 'Greenwich',
    'Putney', 'Richmond', 'Battersea', 'Pimlico', 'Westminster', 'Lambeth',
    'Mayhew', 'Wexford',
  ],
  'outdoor-furniture': [
    'Marbella', 'Como', 'Riviera', 'Cinque', 'Capri', 'Amalfi', 'Positano',
    'Sorrento', 'Portofino', 'Santorini', 'Mykonos', 'Ibiza', 'Corfu',
    'Crete', 'Sardinia', 'Provence', 'Cassis', 'Antibes', 'Cannes', 'Ravello',
    'Sirmione', 'Bellagio', 'Varenna', 'Menaggio', 'Tropea',
  ],
  'chairs': [
    'Wren', 'Otis', 'Iris', 'Nora', 'Lena', 'Mae', 'Vera', 'Junie', 'Solé',
    'Klein', 'Renn', 'Ulla', 'Zima', 'Briar', 'Elin', 'Fia', 'Gita', 'Hilde',
    'Indi', 'Klio', 'Lyra', 'Maia', 'Sera', 'Tova', 'Vega', 'Lior', 'Niva',
    'Iver', 'Kjell', 'Ravi', 'Sola', 'Tula', 'Una', 'Wynn', 'Yael', 'Zoe',
    'Asa', 'Bri', 'Cora', 'Dell', 'Esme', 'Fran', 'Gia',
  ],
  'bar-stools': [
    'Tonic', 'Halo', 'Pivot', 'Atlas', 'Apex', 'Crest', 'Edge', 'Loop',
    'Anchor', 'Beam', 'Caster', 'Echo', 'Forge', 'Glade', 'Jolt', 'Kira',
    'Mason', 'Nova', 'Otto', 'Pace', 'Ridge', 'Shade', 'Tilt', 'Uno', 'Verve',
    'Wave', 'Yoke', 'Zen', 'Aero', 'Clove', 'Drum', 'Ember', 'Fern', 'Gust',
    'Helm', 'Iva', 'Joist', 'Knot', 'Latch', 'Mast', 'Notch', 'Oath', 'Pier',
    'Reed', 'Sage', 'Vane', 'Whorl', 'Yarn', 'Zest', 'Arc', 'Blade', 'Cane',
    'Dune', 'Elm', 'Foil', 'Gable', 'Hewn', 'Ivy', 'Lath', 'Mead', 'Pith',
    'Rune', 'Sled', 'Vine', 'Wisp', 'Brio', 'Cog', 'Dial', 'Filo', 'Gist',
    'Hone', 'Jot', 'Lyle', 'Mox', 'Pip',
  ],
};

const CATEGORIES = [
  {
    key: 'living-room-sets',
    count: 57,
    basePrice: 2990,
    en: { description: 'Made-to-order sofa. Configure the seat count, depth, and upholstery to your room.' },
    he: { description: 'ספה בייצור אישי, לפי המידות והבדים שתבחרו. תצורה בהתאמה לחלל שלכם.' },
    material: 'Made-to-order',
    color: 'Custom',
    sizeMin: '2-seater · 180 × 90 cm',
    sizeMax: '5-seater + chaise · 360 × 220 cm',
  },
  {
    key: 'beds',
    count: 36,
    basePrice: 1990,
    en: { description: 'Custom bed frame, upholstered to your spec. Any mattress size from single up to super-king.' },
    he: { description: 'מסגרת מיטה מרופדת לפי המידות שלכם. מתאימה לכל מזרן מיחיד ועד סופר־קינג.' },
    material: 'Made-to-order',
    color: 'Custom',
    sizeMin: 'Single · 90 × 190 cm',
    sizeMax: 'Super King · 200 × 220 cm',
  },
  {
    key: 'coffee-tables',
    count: 25,
    basePrice: 590,
    en: { description: 'Made-to-order coffee table. Pick the top material, base finish, and size to suit your sofa.' },
    he: { description: 'שולחן סלון בייצור אישי. בחירה של חומר הפלטה, גימור הבסיס והמידה — לפי הספה שלכם.' },
    material: 'Made-to-order',
    color: 'Custom',
    sizeMin: '60 × 60 cm',
    sizeMax: '140 × 80 cm',
  },
  {
    key: 'dining-tables',
    count: 40,
    basePrice: 1490,
    en: { description: 'A made-to-order dining table. Solid-wood top, choice of base, sized to your room.' },
    he: { description: 'שולחן אוכל בייצור אישי. פלטת עץ מלא, בסיס לבחירה, ובמידות לפי החדר שלכם.' },
    material: 'Made-to-order',
    color: 'Custom',
    sizeMin: '120 × 80 cm',
    sizeMax: '280 × 120 cm',
  },
  {
    key: 'outdoor-furniture',
    count: 25,
    basePrice: 1790,
    en: { description: 'Weather-grade outdoor seating, built to spec. Wicker, aluminium, and quick-dry cushions.' },
    he: { description: 'ריהוט גן עמיד לכל מזג אוויר, בייצור אישי. קלוע, אלומיניום וכריות שמתייבשות מהר.' },
    material: 'Made-to-order',
    color: 'Custom',
    sizeMin: '2-seater',
    sizeMax: '6-seater modular',
  },
  {
    key: 'chairs',
    count: 43,
    basePrice: 390,
    en: { description: 'Dining or accent chair, hand-finished. Pick the wood, fabric, and seat height.' },
    he: { description: 'כיסא לפינת אוכל או ככיסא אקצנט, בגימור ידני. עץ, בד וגובה לבחירה.' },
    material: 'Made-to-order',
    color: 'Custom',
    sizeMin: '45 × 50 × 90 cm',
    sizeMax: '',
  },
  {
    key: 'bar-stools',
    count: 74,
    basePrice: 290,
    en: { description: 'Bar or counter stool, made to spec. Choose your finish, fabric, and seat height.' },
    he: { description: 'כיסא בר או דלפק, בייצור אישי. גימור, בד וגובה לבחירה.' },
    material: 'Made-to-order',
    color: 'Custom',
    sizeMin: 'Counter · 65 cm',
    sizeMax: 'Bar · 85 cm',
  },
];

const pad = (n) => String(n).padStart(3, '0');

// Apply an OVERRIDES entry (if any) on top of a generated product.
// Top-level fields shallow-merge; the i18n sub-object deep-merges per language.
function applyOverride(product) {
  const ov = OVERRIDES[product.slug];
  if (!ov) return product;
  return {
    ...product,
    ...ov,
    i18n: {
      en: { ...product.i18n.en, ...(ov.en || {}) },
      he: { ...product.i18n.he, ...(ov.he || {}) },
    },
  };
}

export const products = CATEGORIES.flatMap((cat) =>
  Array.from({ length: cat.count }, (_, i) => {
    const num = pad(i + 1);
    const pool = NAMES[cat.key] || [];
    const baseName = pool[i] || `${cat.key} ${num}`;
    return applyOverride({
      slug: `${cat.key}-${num}`,
      category: cat.key,
      price: cat.basePrice,
      material: cat.material,
      color: cat.color,
      sizeMin: cat.sizeMin,
      sizeMax: cat.sizeMax,
      image: `/shop_photos/${cat.key}/${num}.webp`,
      i18n: {
        en: { name: baseName, description: cat.en.description },
        he: { name: baseName, description: cat.he.description },
      },
    });
  })
);

export const getByCategory = (category) =>
  products.filter((p) => p.category === category);

export const getBySlug = (slug) => products.find((p) => p.slug === slug);

export const localized = (product, lang) =>
  (product.i18n && product.i18n[lang]) || (product.i18n && product.i18n.en) || product;
