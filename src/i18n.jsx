import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'fr-lang';

const dictionary = {
  en: {
    'brand': 'Wood and Weave',
    'nav.living-room-sets': 'Sofas',
    'nav.beds': 'Beds',
    'nav.coffee-tables': 'Coffee Tables',
    'nav.dining-tables': 'Dining Tables',
    'nav.outdoor-furniture': 'Outdoor',
    'nav.chairs': 'Chairs',
    'nav.bar-stools': 'Bar Stools',
    'nav.lang': 'Language',

    'home.hero.kicker': 'Made-to-order · factory direct',
    'home.hero.line1': 'Quiet rooms.',
    'home.hero.line2': 'Honest pieces.',
    'home.hero.sub': "Every couch, bed, and dining table is built in our own workshop — to your fabric, finish, and exact size.",
    'home.hero.cta.shop': 'Browse the catalogue',
    'home.hero.cta.contact': 'Contact us',

    'home.bento.title': 'Shop by category',
    'home.bento.sub': "Designs we've built. Choose one — then we'll customize it for your space.",

    'home.values.kicker': 'Why Wood and Weave',
    'home.values.title': 'Built to live with, not to replace.',
    'home.values.sustain.title': 'Sustainable materials',
    'home.values.sustain.copy': 'FSC-certified solid woods, recycled steel frames, and natural latex. Every material traceable to its source.',
    'home.values.modular.title': 'Made to your room',
    'home.values.modular.copy': 'Tell us the exact size you need. We build the frame to fit your space — to the centimetre.',
    'home.values.ar.title': 'Choose your fabric',
    'home.values.ar.copy': 'Linen, cotton, chenille, polyester, velvet. Pick from our fabric library or bring your own.',

    'footer.tagline': 'Considered furniture, crafted to outlast trends. Made-to-order, direct from our factory.',
    'footer.shop': 'Shop',
    'footer.contact': 'Contact',
    'footer.copy': '© 2026 Wood and Weave. Sustainably made.',

    'plp.kicker.living-room-sets':  'Living',
    'plp.kicker.beds':              'Bedroom',
    'plp.kicker.coffee-tables':     'Living',
    'plp.kicker.dining-tables':     'Dining',
    'plp.kicker.outdoor-furniture': 'Outdoor',
    'plp.kicker.chairs':            'Seating',
    'plp.kicker.bar-stools':        'Seating',
    'plp.title.living-room-sets':  'Sofas',
    'plp.title.beds':              'Beds',
    'plp.title.coffee-tables':     'Coffee Tables',
    'plp.title.dining-tables':     'Dining Tables',
    'plp.title.outdoor-furniture': 'Outdoor Furniture',
    'plp.title.chairs':            'Chairs',
    'plp.title.bar-stools':        'Bar Stools',
    'plp.blurb.living-room-sets':  'Sofas made to order — every depth, length, and fabric configured to your room.',
    'plp.blurb.beds':              'Upholstered and solid-wood beds, hand-finished and built to last.',
    'plp.blurb.coffee-tables':     'Low tables in stone, wood, and metal — to live in front of the sofa.',
    'plp.blurb.dining-tables':     'Tables sized for everyday life and long dinners.',
    'plp.blurb.outdoor-furniture': 'Weather-grade pieces in wicker, aluminium, and quick-dry cushions.',
    'plp.blurb.chairs':            'Dining and accent chairs in a range of upholsteries.',
    'plp.blurb.bar-stools':        'Counter and bar heights for kitchen islands and home bars.',
    'plp.count': '{n} pieces',
    'plp.filters': 'Filters',
    'plp.clear': 'Clear',
    'plp.empty.title': 'Nothing matches.',
    'plp.empty.cta': 'Clear filters',
    'plp.filter.materials': 'Materials',
    'plp.filter.colors': 'Colors',
    'plp.filter.dimensions': 'Dimensions',

    'pdp.breadcrumb.home': 'Home',
    'pdp.config': 'Configuration',
    'pdp.color': 'Color',
    'pdp.spec.material': 'Material',
    'pdp.spec.size': 'Size range',
    'pdp.spec.size.fixed': 'Size',
    'pdp.spec.lead': 'Lead time',
    'pdp.spec.lead.value': '3–5 weeks',
    'pdp.trust.delivery': 'Delivery & assembly',
    'pdp.trust.factory':  'Made in our factory',
    'pdp.trust.custom':   'Custom dimensions',
    'pdp.story.title': 'From our factory to your home',
    'pdp.story.copy': 'Every piece is built to order in our own factory. Choose the design here, then talk to us about your fabric, finish, and exact dimensions — we’ll build it for you in 3–5 weeks.',
    'price.from': 'From',
    'pdp.contact.call': 'Call',
    'pdp.contact.whatsapp': 'WhatsApp',
    'pdp.contact.message': "Hi, I'm interested in {name} — can you tell me more?",
    'pdp.fabrics.title': 'Available fabrics',
    'fabric.linen-cotton':       'Linen & Cotton',
    'fabric.chenille-polyester': 'Chenille & Polyester',
    'fabric.velvet':             'Velvet',

    'config.2seat': '2-Seater',
    'config.3seat': '3-Seater',
    'config.chaise': '3-Seater + Chaise',
    'config.bed.single':    'Single',
    'config.bed.double':    'Double',
    'config.bed.queen':     'Queen',
    'config.bed.king':      'King',
    'config.bed.superking': 'Super King',

  },
  he: {
    'brand': 'עץ ובד',
    'nav.living-room-sets': 'ספות',
    'nav.beds': 'מיטות',
    'nav.coffee-tables': 'שולחנות סלון',
    'nav.dining-tables': 'שולחנות אוכל',
    'nav.outdoor-furniture': 'ריהוט גן',
    'nav.chairs': 'כיסאות',
    'nav.bar-stools': 'כיסאות בר',
    'nav.lang': 'שפה',

    'home.hero.kicker': 'ייצור אישי · ישירות מהמפעל',
    'home.hero.line1': 'חדרים שקטים.',
    'home.hero.line2': 'רהיטים אמיתיים.',
    'home.hero.sub': 'כל ספה, מיטה ושולחן אוכל — מיוצרים אצלנו במפעל, בבד, בגימור ובמידות שלכם.',
    'home.hero.cta.shop': 'לקטלוג',
    'home.hero.cta.contact': 'צרו קשר',

    'home.bento.title': 'קנייה לפי קטגוריה',
    'home.bento.sub': 'עיצובים שבנינו. בחרו אחד — ונבנה אותו במידות שלכם.',

    'home.values.kicker': 'למה עץ ובד',
    'home.values.title': 'רהיטים לחיים, לא להחלפה.',
    'home.values.sustain.title': 'חומרים בני־קיימא',
    'home.values.sustain.copy': 'עץ מלא בתקן FSC, מסגרות פלדה ממוחזרת ולטקס טבעי. כל חומר עם מקור גלוי.',
    'home.values.modular.title': 'מותאם לחדר שלכם',
    'home.values.modular.copy': 'תגידו לנו בדיוק איזה גודל אתם צריכים. אנחנו בונים את השלד למידה — עד הסנטימטר.',
    'home.values.ar.title': 'בחרו את הבד',
    'home.values.ar.copy': 'פשתן, כותנה, שניל, פוליאסטר, קטיפה. בחירה מספריית הבדים שלנו, או הביאו את שלכם.',

    'footer.tagline': 'רהיטים שעוצבו מתוך מחשבה, נבנים כדי להישאר. ייצור אישי, ישירות מהמפעל שלנו.',
    'footer.shop': 'קנייה',
    'footer.contact': 'צרו קשר',
    'footer.copy': '© 2026 עץ ובד. ייצור בר־קיימא.',

    'plp.kicker.living-room-sets':  'סלון',
    'plp.kicker.beds':              'חדר שינה',
    'plp.kicker.coffee-tables':     'סלון',
    'plp.kicker.dining-tables':     'אוכל',
    'plp.kicker.outdoor-furniture': 'גן',
    'plp.kicker.chairs':            'ישיבה',
    'plp.kicker.bar-stools':        'ישיבה',
    'plp.title.living-room-sets':  'ספות',
    'plp.title.beds':              'מיטות',
    'plp.title.coffee-tables':     'שולחנות סלון',
    'plp.title.dining-tables':     'שולחנות אוכל',
    'plp.title.outdoor-furniture': 'ריהוט גן',
    'plp.title.chairs':            'כיסאות',
    'plp.title.bar-stools':        'כיסאות בר',
    'plp.blurb.living-room-sets':  'ספות בייצור אישי — כל עומק, אורך ובד מותאמים לחדר שלכם.',
    'plp.blurb.beds':              'מיטות מרופדות ומעץ מלא, בעבודת יד שמחזיקה שנים.',
    'plp.blurb.coffee-tables':     'שולחנות נמוכים מאבן, עץ ומתכת — לחיים מול הספה.',
    'plp.blurb.dining-tables':     'שולחנות במידות לחיי היומיום ולארוחות ארוכות.',
    'plp.blurb.outdoor-furniture': 'רהיטים עמידים לכל מזג אוויר — קלוע, אלומיניום וכריות שמתייבשות מהר.',
    'plp.blurb.chairs':            'כיסאות לפינת אוכל ולחללים נוספים, במגוון ציפויים.',
    'plp.blurb.bar-stools':        'כיסאות בר וכיסאות דלפק לאי המטבח ולבר הביתי.',
    'plp.count': '{n} פריטים',
    'plp.filters': 'סינון',
    'plp.clear': 'ניקוי',
    'plp.empty.title': 'אין תוצאות.',
    'plp.empty.cta': 'ניקוי סינון',
    'plp.filter.materials': 'חומרים',
    'plp.filter.colors': 'צבעים',
    'plp.filter.dimensions': 'מידות',

    'pdp.breadcrumb.home': 'דף הבית',
    'pdp.config': 'תצורה',
    'pdp.color': 'צבע',
    'pdp.spec.material': 'חומר',
    'pdp.spec.size': 'טווח מידות',
    'pdp.spec.size.fixed': 'מידה',
    'pdp.spec.lead': 'זמן ייצור',
    'pdp.spec.lead.value': '3–5 שבועות',
    'pdp.trust.delivery': 'משלוח והרכבה',
    'pdp.trust.factory':  'מיוצר במפעל שלנו',
    'pdp.trust.custom':   'מידות מותאמות אישית',
    'pdp.story.title': 'מהמפעל שלנו לבית שלכם',
    'pdp.story.copy': 'כל פריט מיוצר בהזמנה אישית במפעל שלנו. בחרו את העיצוב כאן, ספרו לנו על הבד, הגימור והמידות — ונבנה אותו עבורכם תוך 3–5 שבועות.',
    'price.from': 'החל מ־',
    'pdp.contact.call': 'התקשרו',
    'pdp.contact.whatsapp': 'וואטסאפ',
    'pdp.contact.message': 'שלום, התעניינתי ב־{name} — אשמח לפרטים נוספים.',
    'pdp.fabrics.title': 'בדים זמינים',
    'fabric.linen-cotton':       'פשתן וכותנה',
    'fabric.chenille-polyester': 'שניל ופוליאסטר',
    'fabric.velvet':             'קטיפה',

    'config.2seat': 'דו־מושבית',
    'config.3seat': 'תלת־מושבית',
    'config.chaise': 'תלת־מושבית + צ׳ייז',
    'config.bed.single':    'יחיד',
    'config.bed.double':    'זוגי',
    'config.bed.queen':     'קווין',
    'config.bed.king':      'קינג',
    'config.bed.superking': 'סופר־קינג',

    'cat.couches': 'ספות',
    'cat.beds': 'מיטות',
    'cat.mattresses': 'מזרנים',
  },
};

// Canonical (English) value → display label per language
export const valueLabels = {
  he: {
    // materials
    'Smoked oak': 'אלון מעושן',
    'Smoked oak frame': 'מסגרת אלון מעושן',
    'Solid oak': 'אלון מלא',
    'Solid ash': 'דרדר מלא',
    'Boucle fabric': 'בד בוקלה',
    'Linen': 'פשתן',
    'Natural latex': 'לטקס טבעי',
    'Pocket springs + latex': 'קפיצי כיס + לטקס',
    'High-density foam': 'קצף בצפיפות גבוהה',
    // colors
    'Sand': 'חול',
    'Olive': 'זית',
    'Caramel': 'קרמל',
    'Stone': 'אבן',
    'Natural': 'טבעי',
    'Mineral': 'מינרל',
    'Ivory': 'שנהב',
    // size tokens (used inside dimensions strings)
    'Queen': 'קווין',
    'King': 'קינג',
    '2-Seat': 'דו־מושבי',
    '3-Seat': 'תלת־מושבי',
  },
};

export const translateValue = (value, lang) =>
  (valueLabels[lang] && valueLabels[lang][value]) || value;

// Translate known tokens inside a dimensions string (e.g. "Queen · 160 × 200 × 28 cm")
export const translateDimensions = (dims, lang) => {
  if (lang === 'en' || !dims) return dims;
  const map = valueLabels[lang] || {};
  let out = dims;
  for (const [en, local] of Object.entries(map)) {
    if (out.includes(en)) out = out.split(en).join(local);
  }
  return out.replace('cm', lang === 'he' ? 'ס״מ' : 'cm');
};

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
  dir: 'ltr',
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem(STORAGE_KEY) || 'en';
  });

  useEffect(() => {
    const dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (next) => setLangState(next);

  const t = (key, vars) => {
    const raw = (dictionary[lang] && dictionary[lang][key]) || dictionary.en[key] || key;
    if (!vars) return raw;
    return Object.entries(vars).reduce(
      (acc, [k, v]) => acc.replace(`{${k}}`, v),
      raw
    );
  };

  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useT = () => useContext(LanguageContext);
