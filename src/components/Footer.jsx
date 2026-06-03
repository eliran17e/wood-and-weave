import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { useT } from '../i18n.jsx';
import { CONTACT, whatsappUrl } from '../config.js';

const SHOP_CATEGORIES = [
  'living-room-sets',
  'beds',
  'coffee-tables',
  'dining-tables',
  'outdoor-furniture',
  'chairs',
  'bar-stools',
];

export default function Footer() {
  const { t, lang } = useT();
  return (
    <footer className="bg-olive text-sand-100 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2 max-w-sm">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/logos/icon-light-256.png"
              alt=""
              className="h-14 w-14"
            />
            <h3 className="font-display text-2xl">
              {lang === 'he' ? 'עץ ובד' : 'Wood and Weave'}
            </h3>
          </div>
          <p className="text-sm text-sand-200/80 leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Shop — clickable category links */}
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-sand-100/80">
            {t('footer.shop')}
          </h4>
          <ul className="space-y-2 text-sm">
            {SHOP_CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to={`/${c}`}
                  className="text-sand-200/80 hover:text-sand-50 transition-colors"
                >
                  {t(`nav.${c}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact — real, working actions */}
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-sand-100/80">
            {t('footer.contact')}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 text-sand-200/80 hover:text-sand-50 transition-colors"
                dir="ltr"
              >
                <Phone size={14} />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sand-200/80 hover:text-sand-50 transition-colors"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand-200/10 py-6 text-center text-xs text-sand-200/60">
        {t('footer.copy')}
      </div>
    </footer>
  );
}
