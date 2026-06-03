import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useT } from '../i18n.jsx';
import LanguageToggle from './LanguageToggle.jsx';

const CATEGORIES = [
  'living-room-sets',
  'beds',
  'coffee-tables',
  'dining-tables',
  'outdoor-furniture',
  'chairs',
  'bar-stools',
];

export default function Navbar() {
  const { t, lang } = useT();
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setShopOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-sand-50/80 backdrop-blur-md border-b border-sand-200/60">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2 -ml-2 rounded-full hover:bg-sand-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label={lang === 'he' ? 'עץ ובד' : 'Wood and Weave'}
          >
            <img
              src="/logos/icon-96.png"
              alt=""
              className="h-10 w-10 sm:h-11 sm:w-11"
            />
            <span className="font-display text-lg sm:text-xl font-semibold tracking-tight text-olive">
              {lang === 'he' ? 'עץ ובד' : 'Wood and Weave'}
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-5 relative">
          <li ref={dropRef} className="relative">
            <button
              onClick={() => setShopOpen((v) => !v)}
              className="text-sm font-medium text-warmstone hover:text-olive transition-colors inline-flex items-center gap-1"
            >
              {t('footer.shop')}
              <ChevronDown size={14} className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
            </button>
            {shopOpen && (
              <div className="absolute top-full mt-3 start-0 bg-sand-50 rounded-organic shadow-soft border border-sand-200/60 p-2 min-w-[220px]">
                {CATEGORIES.map((c) => (
                  <NavLink
                    key={c}
                    to={`/${c}`}
                    onClick={() => setShopOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-2xl text-sm transition-colors ${
                        isActive
                          ? 'bg-olive/10 text-olive'
                          : 'text-warmstone-deep hover:bg-sand-100'
                      }`
                    }
                  >
                    {t(`nav.${c}`)}
                  </NavLink>
                ))}
              </div>
            )}
          </li>
          {/* All 7 categories as inline quick links */}
          {[
            'living-room-sets',
            'beds',
            'outdoor-furniture',
            'coffee-tables',
            'dining-tables',
            'chairs',
            'bar-stools',
          ].map((c) => (
            <li key={c}>
              <NavLink
                to={`/${c}`}
                className={({ isActive }) =>
                  `text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'text-olive' : 'text-warmstone hover:text-olive'
                  }`
                }
              >
                {t(`nav.${c}`)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-sand-200/60 bg-sand-50">
          <ul className="px-6 py-4 space-y-1">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <NavLink
                  to={`/${c}`}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-2xl text-sm transition-colors ${
                      isActive
                        ? 'bg-olive/10 text-olive'
                        : 'text-warmstone-deep hover:bg-sand-100'
                    }`
                  }
                >
                  {t(`nav.${c}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
