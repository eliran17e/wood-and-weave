import { Link } from 'react-router-dom';
import { useT } from '../i18n.jsx';
import { localized } from '../data/products.js';

// The card fills its grid cell. Image is full-bleed; name + price sit on top
// of a soft gradient that's always present (subtle) and deepens on hover.
const SIZES = {
  md:   '',
  wide: 'sm:col-span-2',  // 2 cols wide × 1 row tall — for landscape photos
  tall: 'sm:row-span-2',  // 1 col wide × 2 rows tall — for portrait photos
};

export default function ProductCard({ product, size = 'md' }) {
  const { lang, t } = useT();
  const l = localized(product, lang);

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group relative block h-full rounded-organic overflow-hidden bg-sand-100 transition-shadow duration-500 ease-organic hover:shadow-soft ${SIZES[size] || ''}`}
    >
      {/* Image — fills the card, gently zooms on hover */}
      <img
        src={product.image}
        alt={l.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-organic group-hover:scale-[1.06]"
      />

      {/* Bottom gradient for legibility — subtle by default, deeper on hover */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 ease-organic group-hover:from-black/70 group-hover:via-black/30" />

      {/* Info overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3 text-sand-50">
        <h3 className="font-display text-base md:text-lg font-medium leading-snug truncate min-w-0">
          {l.name}
        </h3>
        <span className="text-sm font-medium whitespace-nowrap drop-shadow-sm shrink-0">
          <span className="text-[10px] opacity-80 mr-1 rtl:mr-0 rtl:ml-1 font-normal">
            {t('price.from')}
          </span>
          <span dir="ltr">${product.price.toLocaleString()}</span>
        </span>
      </div>
    </Link>
  );
}
