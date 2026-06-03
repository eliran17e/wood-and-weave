import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBySlug, products, localized } from '../data/products.js';
import {
  useT,
  translateValue,
  translateDimensions,
} from '../i18n.jsx';
import { Truck, Ruler, Factory, Phone, MessageCircle } from 'lucide-react';
import { CONTACT, whatsappUrl } from '../config.js';

const COLORS = [
  { name: 'Sand', hex: '#E8DCC4' },
  { name: 'Olive', hex: '#4A5043' },
  { name: 'Caramel', hex: '#C8956D' },
  { name: 'Mineral', hex: '#4A6B7C' },
  { name: 'Stone', hex: '#8B8378' },
];

// Config selectors per category. No price deltas — actual pricing is
// discussed when the customer contacts the shop. The selector is kept as a
// visual hint of what sizes/configurations we can build.
const CONFIGS_SOFA = [
  { id: '2seat',  tKey: 'config.2seat'  },
  { id: '3seat',  tKey: 'config.3seat'  },
  { id: 'chaise', tKey: 'config.chaise' },
];

const CONFIGS_BED = [
  { id: 'single',     tKey: 'config.bed.single'    },
  { id: 'double',     tKey: 'config.bed.double'    },
  { id: 'queen',      tKey: 'config.bed.queen'     },
  { id: 'king',       tKey: 'config.bed.king'      },
  { id: 'superking',  tKey: 'config.bed.superking' },
];

const CONFIGS_BY_CATEGORY = {
  'living-room-sets':  CONFIGS_SOFA,
  'beds':              CONFIGS_BED,
  'outdoor-furniture': CONFIGS_SOFA,
};

// Categories whose products are customisable in size/fabric. Everything else
// is sold "as-is in the picture" — so we hide the Configuration + Color
// sections on those PDPs.
const CUSTOMIZABLE_CATEGORIES = Object.keys(CONFIGS_BY_CATEGORY);

// Fabric collections shown in the slider on customisable PDPs.
const FABRICS = [
  { id: 'linen-cotton',       tKey: 'fabric.linen-cotton',       image: '/shop_photos/fabrics/cotton.jpeg' },
  { id: 'chenille-polyester', tKey: 'fabric.chenille-polyester', image: '/shop_photos/fabrics/polyster.jpeg' },
  { id: 'velvet',             tKey: 'fabric.velvet',             image: '/shop_photos/fabrics/velvet.jpeg' },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { t, lang } = useT();
  const product = getBySlug(slug) || products[0];

  const configs = CONFIGS_BY_CATEGORY[product?.category] || CONFIGS_SOFA;

  const [color, setColor]   = useState(COLORS[0]);
  const [config, setConfig] = useState(configs[0]);

  // When the user navigates from one product category to another (e.g. sofa
  // → bed), reset the selected config to the first option of the new list —
  // otherwise the previous selection ID won't match the new options.
  useEffect(() => {
    setConfig(configs[0]);
  }, [product?.category]);

  const showFabricPicker = product
    ? CUSTOMIZABLE_CATEGORIES.includes(product.category)
    : false;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center text-warmstone">
        Loading…
      </div>
    );
  }

  const l = localized(product, lang);
  const price = product.price;
  const contactMessage = t('pdp.contact.message', { name: l.name });

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-36 lg:pb-32 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <nav className="lg:col-span-2 text-xs text-warmstone mb-2">
          <Link to="/" className="hover:text-olive">{t('pdp.breadcrumb.home')}</Link>
          <span className="mx-2">/</span>
          <Link to={`/${product.category}`} className="hover:text-olive">
            {t(`nav.${product.category}`)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-warmstone-deep">{l.name}</span>
        </nav>

        {/* Sticky gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <div className="rounded-organic overflow-hidden bg-sand-100 aspect-[4/5]">
            <img
              src={product.image}
              alt={l.name}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>

          {showFabricPicker && <FabricPicker />}
        </div>

        {/* Details */}
        <div className="space-y-9">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-warmstone mb-2">
              {t(`nav.${product.category}`)}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light leading-tight mb-4">
              {l.name}
            </h1>
            <p className="text-2xl text-warmstone-deep font-light flex items-baseline gap-2">
              <span className="text-sm text-warmstone font-normal">
                {t('price.from')}
              </span>
              <span dir="ltr">${price.toLocaleString()}</span>
            </p>
          </div>

          <p className="text-warmstone-deep/85 leading-relaxed">
            {l.description}
          </p>

          {CUSTOMIZABLE_CATEGORIES.includes(product.category) && (
            <>
              {/* Configuration */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-sm font-semibold text-warmstone-deep">
                    {t('pdp.config')}
                  </h3>
                  <span className="text-xs text-warmstone">{t(config.tKey)}</span>
                </div>
                <div
                  className={`grid gap-2 ${
                    configs.length > 3
                      ? 'grid-cols-3 sm:grid-cols-5'
                      : 'grid-cols-3'
                  }`}
                >
                  {configs.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setConfig(c)}
                      className={`p-3 rounded-2xl text-xs font-medium border transition-all ${
                        config.id === c.id
                          ? 'border-olive bg-olive text-sand-50'
                          : 'border-sand-200 hover:border-olive/40 text-warmstone-deep'
                      }`}
                    >
                      {t(c.tKey)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-sm font-semibold text-warmstone-deep">
                    {t('pdp.color')}
                  </h3>
                  <span className="text-xs text-warmstone">
                    {translateValue(color.name, lang)}
                  </span>
                </div>
                <div className="flex gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c)}
                      aria-label={translateValue(c.name, lang)}
                      className={`w-11 h-11 rounded-full border-2 transition-all ${
                        color.name === c.name
                          ? 'border-olive ring-2 ring-olive/20 ring-offset-2 ring-offset-sand-50'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Specs */}
          <dl className="border-t border-sand-200 pt-6 space-y-3 text-sm">
            <Spec label={t('pdp.spec.material')} value={translateValue(product.material, lang)} />
            <Spec
              label={product.sizeMax ? t('pdp.spec.size') : t('pdp.spec.size.fixed')}
              value={
                product.sizeMax
                  ? `${translateDimensions(product.sizeMin, lang)} — ${translateDimensions(product.sizeMax, lang)}`
                  : translateDimensions(product.sizeMin, lang)
              }
            />
            <Spec label={t('pdp.spec.lead')} value={t('pdp.spec.lead.value')} />
          </dl>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <Trust icon={<Truck size={16} />} label={t('pdp.trust.delivery')} />
            <Trust icon={<Factory size={16} />} label={t('pdp.trust.factory')} />
            <Trust icon={<Ruler size={16} />} label={t('pdp.trust.custom')} />
          </div>

          <div className="bg-sand-100 rounded-organic p-7">
            <h3 className="font-display text-xl mb-2 text-warmstone-deep">
              {t('pdp.story.title')}
            </h3>
            <p className="text-sm text-warmstone-deep/80 leading-relaxed">
              {t('pdp.story.copy')}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky contact bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-sand-50/95 backdrop-blur-md border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={product.image}
              alt=""
              className="w-12 h-12 rounded-xl object-cover hidden sm:block shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-warmstone-deep truncate">
                {l.name}
              </p>
              <p className="text-xs text-warmstone">
                <span className="opacity-75">{t('price.from')}</span>{' '}
                <span dir="ltr" className="font-medium">
                  ${price.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-1.5 border border-olive/30 text-olive px-4 sm:px-5 py-3 rounded-full text-sm font-medium hover:bg-olive/10 transition-colors"
              aria-label={t('pdp.contact.call')}
            >
              <Phone size={16} />
              <span className="hidden sm:inline">{t('pdp.contact.call')}</span>
            </a>
            <a
              href={whatsappUrl(contactMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-4 sm:px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1ebd5b] transition-colors"
            >
              <MessageCircle size={16} />
              {t('pdp.contact.whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-warmstone">{label}</dt>
      <dd className="text-warmstone-deep text-end">{value}</dd>
    </div>
  );
}

function Trust({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl bg-sand-100/60">
      <span className="text-olive">{icon}</span>
      <span className="text-[11px] text-warmstone-deep leading-tight">{label}</span>
    </div>
  );
}

const FABRIC_ROTATE_MS = 5000;

function FabricPicker() {
  const { t } = useT();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance. The `active` dependency means the timer effectively resets
  // any time the user clicks a tab — they get the full 5s on their choice
  // before it moves on. The `paused` dependency stops the timer on hover.
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % FABRICS.length);
    }, FABRIC_ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, active]);

  return (
    <div
      className="rounded-organic overflow-hidden bg-sand-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="px-5 pt-5 pb-3">
        <p className="text-xs uppercase tracking-[0.2em] text-warmstone">
          {t('pdp.fabrics.title')}
        </p>
      </div>

      {/* Sliding image track. Forced LTR so the slide math is the same in
          both languages — the tab labels still respect page direction. */}
      <div className="overflow-hidden" dir="ltr">
        <div
          className="flex transition-transform duration-700 ease-organic"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {FABRICS.map((f) => (
            <div key={f.id} className="w-full shrink-0 aspect-[16/10]">
              <img
                src={f.image}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tab picker with a progress bar under the active tab */}
      <div className="p-3 grid grid-cols-3 gap-2">
        {FABRICS.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setActive(i)}
            className={`relative text-[11px] sm:text-xs py-2.5 px-2 rounded-xl border transition-all overflow-hidden ${
              active === i
                ? 'border-olive bg-olive text-sand-50'
                : 'border-sand-200 hover:border-olive/40 text-warmstone-deep bg-white'
            }`}
          >
            <span className="relative z-10">{t(f.tKey)}</span>
            {active === i && !paused && (
              <span
                key={`progress-${active}`}
                className="absolute bottom-0 left-0 h-0.5 bg-sand-50/70"
                style={{
                  animation: `fabric-progress ${FABRIC_ROTATE_MS}ms linear forwards`,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
