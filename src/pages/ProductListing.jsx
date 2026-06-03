import ProductCard from '../components/ProductCard.jsx';
import { useT } from '../i18n.jsx';
import { getByCategory } from '../data/products.js';

// Photos in these categories are portrait (vertical product shots on white).
// They look broken when stretched into a wide landscape tile, so we use a
// tall vertical tile as the bento feature for these categories instead.
const PORTRAIT_CATEGORIES = ['chairs', 'bar-stools'];

// Sprinkle a feature tile every ~7 items for visual rhythm.
const sizeFor = (i, category) => {
  if (i % 7 !== 0) return 'md';
  return PORTRAIT_CATEGORIES.includes(category) ? 'tall' : 'wide';
};

export default function ProductListing({ category }) {
  const { t } = useT();
  const items = getByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <header className="mb-12 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-warmstone mb-3">
          {t(`plp.kicker.${category}`)}
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-light mb-4">
          {t(`plp.title.${category}`)}
        </h1>
        <p className="text-warmstone leading-relaxed">{t(`plp.blurb.${category}`)}</p>
      </header>

      <p className="text-sm text-warmstone mb-6">
        {t('plp.count', { n: items.length })}
      </p>

      {items.length === 0 ? (
        <div className="py-24 text-center text-warmstone">
          <p className="font-display text-2xl">{t('plp.empty.title')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[340px]">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} size={sizeFor(i, category)} />
          ))}
        </div>
      )}
    </div>
  );
}
