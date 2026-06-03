import { useT } from '../i18n.jsx';

export default function LanguageToggle() {
  const { lang, setLang } = useT();
  return (
    <div
      className="inline-flex items-center bg-sand-100/70 rounded-full p-0.5 text-xs font-medium"
      dir="ltr"
      role="group"
      aria-label="Language"
    >
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 rounded-full transition-colors ${
          lang === 'en'
            ? 'bg-olive text-sand-50'
            : 'text-warmstone hover:text-olive'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('he')}
        className={`px-3 py-1.5 rounded-full transition-colors ${
          lang === 'he'
            ? 'bg-olive text-sand-50'
            : 'text-warmstone hover:text-olive'
        }`}
      >
        עב
      </button>
    </div>
  );
}
