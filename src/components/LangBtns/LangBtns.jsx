import { useTranslation } from 'react-i18next';

const locales = {
  en: { title: 'English' },
  de: { title: 'Deutsch' },
};

export const LangBtn = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <h1>{t('main.header')}</h1>
      <ul>
        {Object.keys(locales).map((locale) => (
          <li key={locale}>
            <button
              style={{
                fontWeight:
                  i18n.resolvedLanguage === locale ? 'bold' : 'normal',
              }}
              type="submit"
              onClick={() => i18n.changeLanguage(locale)}
            >
              {locales[locale].title}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
