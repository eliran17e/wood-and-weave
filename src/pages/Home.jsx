import { Link } from 'react-router-dom';
import { Leaf, Ruler, Palette, ArrowRight, MessageCircle } from 'lucide-react';
import { useT } from '../i18n.jsx';
import { whatsappUrl } from '../config.js';

// Hero photo + bento tile photos pulled directly from the shop_photos folder
// served by Vite's public/ directory.
const HERO_IMAGE = '/shop_photos/living-room-sets/001.webp';

const BENTO = [
  { key: 'living-room-sets',  image: '/shop_photos/living-room-sets/012.webp',  num: '01', span: 'big' },
  { key: 'beds',              image: '/shop_photos/beds/008.webp',              num: '02' },
  { key: 'outdoor-furniture', image: '/shop_photos/outdoor-furniture/005.webp', num: '03' },
  { key: 'coffee-tables',     image: '/shop_photos/coffee-tables/003.webp',     num: '04' },
  { key: 'dining-tables',     image: '/shop_photos/dining-tables/004.webp',     num: '05' },
  { key: 'chairs',            image: '/shop_photos/chairs/010.webp',            num: '06' },
  { key: 'bar-stools',        image: '/shop_photos/bar-stools/004.webp',        num: '07' },
];

export default function Home() {
  const { t, dir } = useT();
  const isRtl = dir === 'rtl';

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${
            isRtl
              ? 'bg-gradient-to-l from-olive-dark/55 via-olive-dark/25 to-transparent'
              : 'bg-gradient-to-r from-olive-dark/55 via-olive-dark/25 to-transparent'
          }`}
        />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-xl text-sand-50">
            <p className="text-xs uppercase tracking-[0.25em] mb-5 opacity-80">
              {t('home.hero.kicker')}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.05] mb-6">
              {t('home.hero.line1')}
              <br />
              {t('home.hero.line2')}
            </h1>
            <p className="text-base md:text-lg opacity-90 mb-10 max-w-md font-light leading-relaxed">
              {t('home.hero.sub')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/living-room-sets"
                className="inline-flex items-center gap-2 bg-sand-50 text-olive px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sand-100 transition-colors"
              >
                {t('home.hero.cta.shop')}
                <ArrowRight size={16} className="rtl:rotate-180" />
              </Link>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sand-50 border border-sand-50/40 px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sand-50/10 transition-colors"
              >
                <MessageCircle size={16} />
                {t('home.hero.cta.contact')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bento — 7 categories */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between gap-6 mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-light max-w-md">
            {t('home.bento.title')}
          </h2>
          <p className="hidden md:block text-sm text-warmstone max-w-xs">
            {t('home.bento.sub')}
          </p>
        </div>

        {/* 4-col grid, 2 rows. First tile (Living Room) spans 2 cols. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[260px]">
          {BENTO.map((tile) => (
            <BentoTile
              key={tile.key}
              to={`/${tile.key}`}
              image={tile.image}
              number={tile.num}
              label={t(`nav.${tile.key}`)}
              big={tile.span === 'big'}
            />
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-warmstone mb-3">
            {t('home.values.kicker')}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light max-w-xl mb-14">
            {t('home.values.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <ValueProp
              icon={<Leaf size={22} className="text-olive" />}
              title={t('home.values.sustain.title')}
              copy={t('home.values.sustain.copy')}
            />
            <ValueProp
              icon={<Ruler size={22} className="text-olive" />}
              title={t('home.values.modular.title')}
              copy={t('home.values.modular.copy')}
            />
            <ValueProp
              icon={<Palette size={22} className="text-olive" />}
              title={t('home.values.ar.title')}
              copy={t('home.values.ar.copy')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function BentoTile({ to, image, number, label, big = false }) {
  return (
    <Link
      to={to}
      className={`group relative rounded-organic overflow-hidden bg-sand-100 ${
        big ? 'col-span-2 md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-organic group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div
        className={`absolute bottom-0 inset-x-0 ${
          big ? 'p-7 md:p-8' : 'p-5 md:p-6'
        } flex items-end justify-between text-sand-50`}
      >
        <div>
          <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">{number}</p>
          <h3 className={`font-display font-light ${big ? 'text-2xl md:text-4xl' : 'text-lg md:text-2xl'}`}>
            {label}
          </h3>
        </div>
        <ArrowRight
          size={big ? 22 : 18}
          className="opacity-70 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform"
        />
      </div>
    </Link>
  );
}

function ValueProp({ icon, title, copy }) {
  return (
    <div>
      <div className="w-14 h-14 rounded-full bg-olive/10 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="font-display text-xl mb-2 text-warmstone-deep">{title}</h3>
      <p className="text-sm text-warmstone leading-relaxed max-w-xs">{copy}</p>
    </div>
  );
}
